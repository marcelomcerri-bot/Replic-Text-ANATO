import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  pubdate: string;
  abstract: string;
  doi?: string;
  link: string;
  category?: string;
}

interface CacheData {
  articles: PubMedArticle[];
  timestamp: number;
  categories: string[];
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas em millisegundos
const CACHE_FILE = path.join(process.cwd(), ".next", "cache", "pubmed-articles.json");

async function readCache(): Promise<CacheData | null> {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function writeCache(data: CacheData): Promise<void> {
  try {
    const cacheDir = path.dirname(CACHE_FILE);
    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify(data));
  } catch (error) {
    console.error("Erro ao salvar cache:", error);
  }
}

// Categorias de anatomia para buscar
const ANATOMY_CATEGORIES = [
  { name: "Neuroanatomia", query: "neuroanatomy OR brain anatomy" },
  { name: "Anatomia Cardiovascular", query: "cardiovascular anatomy OR heart anatomy" },
  { name: "Anatomia Muscular", query: "muscle anatomy OR muscular system" },
  { name: "Anatomia Óssea", query: "bone anatomy OR skeletal system" },
  { name: "Anatomia Geral", query: "human anatomy" },
];

async function searchPubMed(query: string, days: number = 7): Promise<any[]> {
  const baseUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
  
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);
  
  const dateFilter = `${startDate.getFullYear()}/${String(startDate.getMonth() + 1).padStart(2, '0')}/${String(startDate.getDate()).padStart(2, '0')}:${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}[PDAT]`;
  
  const searchUrl = `${baseUrl}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query + ' AND ' + dateFilter)}&retmax=20&retmode=json&sort=date`;
  
  const searchResponse = await fetch(searchUrl);
  if (!searchResponse.ok) {
    throw new Error(`PubMed search falhou: HTTP ${searchResponse.status}`);
  }
  
  const searchData = await searchResponse.json();
  const pmids = searchData.esearchresult?.idlist || [];
  
  if (pmids.length === 0) {
    return [];
  }
  
  const fetchUrl = `${baseUrl}/esummary.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=json`;
  const fetchResponse = await fetch(fetchUrl);
  if (!fetchResponse.ok) {
    throw new Error(`PubMed fetch falhou: HTTP ${fetchResponse.status}`);
  }
  
  const fetchData = await fetchResponse.json();
  const articles: any[] = [];
  
  for (const pmid of pmids) {
    const article = fetchData.result?.[pmid];
    if (article) {
      articles.push({
        pmid,
        title: article.title || "Sem título",
        authors: article.authors?.slice(0, 3).map((a: any) => a.name).join(", ") || "Autores não disponíveis",
        journal: article.source || "Revista não disponível",
        pubdate: article.pubdate || article.epubdate || "Data não disponível",
        abstract: article.abstract || "",
        doi: article.elocationid || "",
        link: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      });
    }
  }
  
  return articles;
}

async function fetchAllArticles(): Promise<PubMedArticle[]> {
  const allArticles: PubMedArticle[] = [];
  
  // Buscar artigos para cada categoria
  for (const category of ANATOMY_CATEGORIES) {
    const articles = await searchPubMed(category.query, 7);
    
    // Adicionar categoria aos artigos
    const categorizedArticles = articles.map(article => ({
      ...article,
      category: category.name,
    }));
    
    allArticles.push(...categorizedArticles);
    
    // Pequeno delay para respeitar rate limits
    await new Promise(resolve => setTimeout(resolve, 400));
  }
  
  // Remover duplicatas baseado no PMID
  const uniqueArticles = Array.from(
    new Map(allArticles.map(article => [article.pmid, article])).values()
  );
  
  // Ordenar por data (mais recente primeiro)
  uniqueArticles.sort((a, b) => {
    const dateA = new Date(a.pubdate);
    const dateB = new Date(b.pubdate);
    return dateB.getTime() - dateA.getTime();
  });
  
  return uniqueArticles;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const forceRefresh = searchParams.get("refresh") === "true";
    
    // Ler cache persistente
    const now = Date.now();
    let cache = await readCache();
    const cacheValid = cache && (now - cache.timestamp) < CACHE_DURATION;
    
    if (!cacheValid || forceRefresh) {
      console.log("Buscando novos artigos do PubMed...");
      
      try {
        const articles = await fetchAllArticles();
        const categories = Array.from(new Set(articles.map(a => a.category).filter(Boolean)));
        
        cache = {
          articles,
          timestamp: now,
          categories: categories as string[],
        };
        
        await writeCache(cache);
        
        if (articles.length === 0) {
          console.log("PubMed retornou 0 artigos (resultado válido)");
        } else {
          console.log(`PubMed retornou ${articles.length} artigos`);
        }
      } catch (fetchError) {
        console.error("Erro ao buscar artigos do PubMed:", fetchError);
        
        if (cache) {
          console.log("Usando cache expirado como fallback devido a erro de rede");
        } else {
          return NextResponse.json(
            { 
              error: "Não foi possível conectar ao PubMed. Por favor, verifique sua conexão e tente novamente.",
              details: fetchError instanceof Error ? fetchError.message : "Erro desconhecido"
            },
            { status: 503 }
          );
        }
      }
    }
    
    if (!cache) {
      return NextResponse.json(
        { error: "Cache não disponível e busca falhou" },
        { status: 503 }
      );
    }
    
    let filteredArticles = cache.articles;
    
    if (category && category !== "Todas") {
      filteredArticles = filteredArticles.filter(a => a.category === category);
    }
    
    return NextResponse.json({
      articles: filteredArticles,
      categories: cache.categories,
      cachedAt: new Date(cache.timestamp).toISOString(),
      nextUpdate: new Date(cache.timestamp + CACHE_DURATION).toISOString(),
    });
  } catch (error) {
    console.error("Erro crítico na API contemporary:", error);
    return NextResponse.json(
      { 
        error: "Erro interno do servidor ao processar requisição",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}
