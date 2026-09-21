# CodeScrum — versão HTML + CSS + JavaScript

Esta versão foi feita para ser fácil de estudar e modificar, sem TypeScript, React ou frameworks.

## Estrutura

- `index.html` — estrutura da página
- `css/style.css` — todo o visual
- `js/script.js` — produtos, filtros e carrinho
- `README.md` — este guia

## Como abrir

1. Extraia a pasta.
2. Abra `index.html` no navegador.
3. Para editar, use VS Code.

## Onde mudar as coisas

### Produtos
Abra `js/script.js` e procure:

`const products = [...]`

Ali você pode alterar nome, categoria, emoji, preço e desconto.

### Kits
No mesmo arquivo:

`const kits = [...]`

### Cores
Abra `css/style.css` e procure `:root`.

As principais são:
- `--primary` = azul principal
- `--primary-dark` = azul ao passar o mouse
- `--accent` = amarelo
- `--text` = texto principal

### Textos
Os textos principais ficam em `index.html`.

### Imagens reais
Os emojis foram usados de propósito para deixar o projeto independente de imagens externas. Depois você pode trocar o conteúdo de `.product-img` por `<img src="...">`.

## Observação

O carrinho funciona no navegador e salva os itens no `localStorage`. O botão de finalizar pedido é apenas uma demonstração; para transformar em loja real seria necessário backend, banco de dados e integração de pagamento.
