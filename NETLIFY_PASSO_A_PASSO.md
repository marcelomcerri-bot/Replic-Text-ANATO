# Como Adicionar a Chave da API no Netlify - Passo a Passo

## ✅ Aqui no Replit já funciona!

Você acabou de adicionar a chave e o chat com IA já está funcionando aqui. Agora vamos fazer o mesmo no Netlify.

---

## 📋 Passo a Passo no Netlify

### 1. Faça o Deploy do Site

Primeiro, faça o push do código e espere o Netlify fazer o deploy automático (ou faça deploy manual).

### 2. Acesse o Painel do Netlify

1. Entre em: https://app.netlify.com/
2. Clique no site que você fez deploy
3. Você vai ver o painel principal do site

### 3. Vá para as Configurações de Variáveis de Ambiente

Siga este caminho:

```
Site settings (botão no topo) 
    → Build & deploy (menu lateral esquerdo)
    → Environment (seção no meio da página)
    → Environment variables (clique em "Edit variables" ou "Add variable")
```

Ou mais direto:

```
Site settings → Environment variables
```

### 4. Adicione a Variável

1. Clique no botão **"Add a variable"** ou **"New variable"**
2. Você verá dois campos:
   
   **Key (nome da variável):**
   ```
   GEMINI_API_KEY
   ```
   
   **Value (o valor):**
   ```
   [Cole aqui a mesma chave que você acabou de usar no Replit]
   ```

3. Clique em **"Save"** ou **"Create variable"**

### 5. Faça um Novo Deploy

⚠️ **IMPORTANTE:** Adicionar a variável NÃO aplica automaticamente. Você precisa fazer um novo deploy!

**Opção 1 - Via Git (se configurou deploy automático):**
- Faça qualquer commit pequeno e push
- Ou force um novo deploy no painel

**Opção 2 - Via Painel do Netlify:**
1. Vá em **Deploys** (no menu superior)
2. Clique em **"Trigger deploy"**
3. Selecione **"Clear cache and deploy site"**

### 6. Pronto! ✅

Aguarde o deploy terminar (geralmente 1-3 minutos) e o chat com IA estará funcionando no Netlify também!

---

## 🔍 Como Verificar se Funcionou

1. Acesse seu site no Netlify
2. Clique no botão do chat (ícone de mensagem no canto)
3. Faça uma pergunta de anatomia
4. Se responder = ✅ Funcionou!
5. Se der erro de "chave não configurada" = ❌ Refaça o passo 5 (novo deploy)

---

## 💡 Dica

Você pode usar a **mesma chave** do Replit no Netlify. A chave do Google Gemini funciona em qualquer lugar!

---

## ⚠️ Troubleshooting

**Problema:** Chat continua dando erro depois de adicionar a variável
**Solução:** Você esqueceu de fazer um novo deploy! Sempre precisa fazer deploy depois de adicionar variáveis.

**Problema:** Não encontro onde adicionar variáveis
**Solução:** Certifique-se de que clicou no site correto e está em "Site settings" (não "Team settings")

**Problema:** Netlify não faz deploy do código
**Solução:** Verifique se conectou o repositório Git corretamente ou se está fazendo deploy manual
