#!/bin/bash

# Script para baixar imagens específicas do OpenStax Anatomy and Physiology 2e
# Todas as imagens são licenciadas sob CC BY 4.0

echo "=========================================="
echo "📥 Baixando imagens do OpenStax"
echo "=========================================="

# Criar diretórios se não existirem
mkdir -p public/anatomia-images/musculos-membro-superior
mkdir -p public/anatomia-images/ossos-membro-superior
mkdir -p public/anatomia-images/arterias-veias-membro-superior

# Função para baixar imagem
download_image() {
    local url=$1
    local output=$2
    local description=$3
    
    echo ""
    echo "📥 Baixando: $description"
    echo "   URL: $url"
    echo "   Destino: $output"
    
    if curl -L -s -o "$output" "$url"; then
        if [ -s "$output" ]; then
            echo "   ✓ Sucesso!"
        else
            echo "   ✗ Arquivo vazio, removendo..."
            rm "$output"
        fi
    else
        echo "   ✗ Falha no download"
    fi
}

echo ""
echo "🦾 Músculos do Membro Superior"
echo "=========================================="

# Exemplos de imagens do OpenStax que podemos buscar
# Nota: As URLs abaixo são placeholders - precisam ser atualizadas com URLs reais do OpenStax

# Exemplo de como buscar imagens:
# download_image \
#     "https://openstax.org/apps/archive/20230828.173347/resources/[hash]" \
#     "public/anatomia-images/musculos-membro-superior/openstax-[nome].jpg" \
#     "Descrição da imagem"

echo ""
echo "✓ Processo concluído"
echo "=========================================="
echo ""
echo "IMPORTANTE: Este script usa placeholders."
echo "Para baixar imagens reais, você precisa:"
echo "1. Acessar https://openstax.org/books/anatomy-and-physiology-2e/"
echo "2. Encontrar as imagens relevantes"
echo "3. Obter as URLs reais das imagens"
echo "4. Atualizar este script com as URLs corretas"
echo ""
echo "Todas as imagens devem ser creditadas como:"
echo "OpenStax Anatomy and Physiology 2e, CC BY 4.0"
echo "=========================================="
