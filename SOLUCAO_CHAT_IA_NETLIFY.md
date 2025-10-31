# Solução Definitiva: Chat de IA no Netlify

## ⚠️ ATUALIZAÇÃO: Problemas Resolvidos!

### 1. Build Error → ✅ CORRIGIDO
Veja `ERRO_BUILD_NETLIFY_RESOLVIDO.md`

### 2. Página 404 → ✅ CORRIGIDO
Veja `PROBLEMA_404_RESOLVIDO.md`

### 3. Chat dando erro após primeiras perguntas → ✅ CORRIGIDO
Veja `CHAT_IA_TIMEOUT_RESOLVIDO.md` para detalhes completos

---

## Problema Original
O chat de IA funciona perfeitamente no Replit mas falha no Netlify.

## Causa Raiz
As rotas de API do Next.js precisam de configurações específicas no Netlify para funcionar corretamente com variáveis de ambiente.

---

## ✅ SOLUÇÃO PASSO A PASSO

### 1. Verifique sua Variável de Ambiente no Netlify

1. Acesse seu site no [Netlify Dashboard](https://app.netlify.com/)
2. Vá em **Site settings** → **Environment variables**
3. Verifique se existe a variável:
   - **Nome da variável**: `GEMINI_API_KEY`
   - **Valor**: Sua chave da API do Google Gemini

### 2. IMPORTANTE: A variável DEVE ser aplicada em TODOS os contextos

No Netlify, clique em **"Edit variable"** e certifique-se que está marcado:
- ✅ **Deploy contexts**: Production, Deploy Previews, Branch Deploys
- ✅ **Scopes**: Builds, Functions, Post-processing

**Isso é CRUCIAL!** Se não estiver aplicado a "Functions", a API route não terá acesso à chave.

### 3. Limpe o Cache e Faça Novo Deploy

Após adicionar ou editar a variável:

1. Vá em **Deploys**
2. Clique em **"Trigger deploy"**
3. Selecione **"Clear cache and deploy site"** (IMPORTANTE: não apenas "Deploy site")

### 4. Verifique os Logs da Function

Após o deploy:

1. Vá em **Functions** no menu lateral do Netlify
2. Procure pela function `chat` (ou similar)
3. Clique para ver os logs em tempo real
4. Teste o chat no seu site
5. Veja se aparecem erros nos logs

---

## 🔍 DIAGNÓSTICO: Como Testar se Funciona

### Teste 1: Verificar se a API Route existe
```bash
curl https://SEU-SITE.netlify.app/api/chat -X POST \
  -H "Content-Type: application/json" \
  -d '{"question":"teste","history":[]}'
```

**Resultado esperado:**
- ✅ Status 200 com resposta JSON
- ❌ Status 500 = problema com a chave da API
- ❌ Status 404 = a function não foi criada

### Teste 2: Verificar no Browser
1. Abra seu site no Netlify
2. Pressione F12 (DevTools)
3. Vá na aba **Network**
4. Tente fazer uma pergunta no chat
5. Veja a requisição para `/api/chat`
6. Clique na requisição e veja a resposta

---

## 🚨 ERROS COMUNS E SOLUÇÕES

### Erro 1: "GEMINI_API_KEY não está configurada"
**Causa**: A variável não está disponível na serverless function

**Solução**:
1. Verifique se a variável está com o nome EXATO: `GEMINI_API_KEY`
2. Verifique se está aplicada ao contexto "Functions"
3. Faça "Clear cache and deploy site"

### Erro 2: "Function size exceeds limit"
**Causa**: O bundle da function está muito grande

**Solução**: Já está corrigido no código (usamos imports dinâmicos)

### Erro 3: Timeout (function demorou muito)
**Causa**: O Netlify tem timeout padrão de 10 segundos para functions gratuitas

**Solução**:
- Para planos pagos: aumente o timeout nas configurações
- Para plano gratuito: otimize as respostas (já feito no código)

### Erro 4: "Module not found: @google/genai"
**Causa**: Dependências não instaladas corretamente

**Solução**:
1. Verifique se `@google/genai` está em `dependencies` (não em devDependencies)
2. O comando de build já inclui `npm install --legacy-peer-deps`

---

## 📋 CHECKLIST FINAL

Antes de considerar o problema resolvido, verifique:

- [ ] ✅ Variável `GEMINI_API_KEY` existe no Netlify
- [ ] ✅ Variável está aplicada ao contexto "Functions"
- [ ] ✅ Fez "Clear cache and deploy site" após adicionar a variável
- [ ] ✅ Deploy completou com sucesso (sem erros)
- [ ] ✅ Function `chat` aparece na lista de Functions do Netlify
- [ ] ✅ Teste manual do chat funciona no site
- [ ] ✅ Não há erros nos logs da function

---

## 🆘 SE AINDA NÃO FUNCIONAR

### Opção 1: Verificar Logs Detalhados
1. Netlify Dashboard → Deploys → [seu deploy mais recente]
2. Role até "Function bundling"
3. Procure por mensagens de erro relacionadas a `chat`

### Opção 2: Testar Localmente com Build de Produção
```bash
# No Replit
npm run build
# Se der erro aqui, o deploy no Netlify também vai falhar
```

### Opção 3: Verificar a Chave da API
1. Teste sua `GEMINI_API_KEY` diretamente:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=SUA_CHAVE_AQUI"
```
2. Se der erro 400/401, a chave está inválida

---

## 📝 MUDANÇAS FEITAS NO CÓDIGO

1. ✅ **netlify.toml**: Removido redirect desnecessário que causava conflito
2. ✅ **lib/gemini.ts**: Já tem tratamento de erro adequado
3. ✅ **app/api/chat/route.ts**: Já retorna erros JSON corretos

---

## 🎯 RESUMO EXECUTIVO

**O que você PRECISA fazer:**

1. Adicionar `GEMINI_API_KEY` nas variáveis de ambiente do Netlify
2. Certificar que está aplicada a "Functions" 
3. Fazer "Clear cache and deploy site"
4. Esperar o deploy completar (2-5 minutos)
5. Testar o chat

**Tempo estimado**: 5-10 minutos

**Se fizer exatamente isso, VAI FUNCIONAR!** ✨
