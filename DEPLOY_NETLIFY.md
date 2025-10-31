# Como fazer Deploy no Netlify

## 1. Preparação

Seu projeto já está configurado e pronto para deploy! ✅

## 2. Passo a Passo no Netlify

### Opção A: Deploy via Git (Recomendado)

1. Faça commit de todas as alterações no seu repositório Git
2. Acesse [Netlify](https://app.netlify.com/)
3. Clique em "Add new site" → "Import an existing project"
4. Conecte seu repositório do GitHub/GitLab/Bitbucket
5. As configurações já estão no arquivo `netlify.toml`, então apenas clique em "Deploy"

### Opção B: Deploy Manual

1. Execute `npm run build` localmente
2. Acesse [Netlify](https://app.netlify.com/)
3. Arraste a pasta `.next` para a área de deploy

## 3. Configurar Variável de Ambiente

⚠️ **IMPORTANTE**: Para o chat com IA funcionar, você precisa adicionar a chave da API do Gemini:

### Guia Rápido:

1. No painel do Netlify, vá em **"Site settings" → "Environment variables"**
2. Clique em **"Add a variable"**
3. Adicione:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: A mesma chave que você usa aqui no Replit
   
4. **MUITO IMPORTANTE**: Após adicionar a variável, você PRECISA fazer um novo deploy:
   - Vá em "Deploys" → "Trigger deploy" → "Clear cache and deploy site"
   - Ou faça um novo commit/push se estiver usando Git

### Precisa de Ajuda Visual?

Veja o arquivo **`NETLIFY_PASSO_A_PASSO.md`** para um guia detalhado com instruções passo a passo!

## 4. Verificar Deploy

Após o deploy:
- ✅ O site deve estar funcionando normalmente
- ✅ Todas as páginas (Início, Tópicos, Glossário, Referências) devem carregar
- ✅ O chat com IA só funcionará se a variável `GEMINI_API_KEY` estiver configurada

## ⚠️ TODOS OS PROBLEMAS FORAM RESOLVIDOS!

### ✅ Problemas Corrigidos:

1. **Erro de Build (Exit code 2)** → RESOLVIDO
   - Veja: `ERRO_BUILD_NETLIFY_RESOLVIDO.md`

2. **Página 404** → RESOLVIDO
   - Veja: `PROBLEMA_404_RESOLVIDO.md`

3. **Chat de IA dando erro** → RESOLVIDO
   - Veja: `CHAT_IA_TIMEOUT_RESOLVIDO.md`

**📋 RESUMO COMPLETO**: Veja `RESUMO_COMPLETO_CORRECOES.md` para todos os detalhes!

### 🚀 Próximo Passo:
```bash
git add .
git commit -m "Fix: Corrige build, 404 e timeout do chat no Netlify"
git push
```

## Arquivos de Configuração Criados

- ✅ `netlify.toml` - Configurações de build e deploy
- ✅ `.env.example` - Exemplo das variáveis de ambiente necessárias
- ✅ Ajustes no código para suportar build sem a chave da API

## Troubleshooting

### Build falha
- Verifique se o Node.js está na versão 20 (já configurado no netlify.toml)
- Execute `npm run build` localmente para verificar erros

### Chat com IA não funciona
**LEIA O ARQUIVO `SOLUCAO_CHAT_IA_NETLIFY.md` PARA SOLUÇÃO DETALHADA!**

Resumo rápido:
1. Adicione `GEMINI_API_KEY` nas Environment Variables do Netlify
2. IMPORTANTE: Ao editar a variável, marque que ela deve ser aplicada a **"Functions"**
3. Após adicionar, faça **"Clear cache and deploy site"** (não apenas "Deploy site")
4. Verifique os logs da Function após o deploy

### Imagens não aparecem
- As imagens estão na pasta `public/anatomia-images` e devem funcionar automaticamente
