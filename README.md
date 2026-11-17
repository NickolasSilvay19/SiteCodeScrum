# CodeScrum — HTML, CSS e JavaScript

Loja demonstrativa de materiais escolares, criada sem TypeScript, React ou frameworks. O projeto foi organizado para facilitar a leitura e a edição no Visual Studio Code.

## Como abrir
1. Extraia o arquivo ZIP.
2. Abra a pasta `CodeScrum_Final`.
3. Abra `index.html` no navegador.
4. Para editar o projeto, abra a pasta inteira no Visual Studio Code.

## Estrutura
- `index.html`: estrutura e textos da página.
- `css/style.css`: cores, tamanhos, espaçamentos, cartões e responsividade.
- `js/script.js`: catálogo, kits, filtros, carrinho e preços.
- `assets/logo-codescrum.png`: símbolo da marca com fundo transparente.

## Como editar os kits
No arquivo `js/script.js`, procure `const kits = [...]`.
Cada kit possui:
- `level`: etapa escolar indicada;
- `price`: preço demonstrativo;
- `groups`: categorias, materiais e quantidades;
- `usage`: explicação de como os materiais podem ser usados na escola.

Para mudar uma quantidade, altere o número depois do nome do item. Exemplo:
`["Caneta azul", 3]`.

## Como editar os preços
Os preços dos kits ficam no campo `price` de cada kit. São valores estimados para demonstrar a loja, não cotações reais de fornecedores. Atualize-os quando tiver os custos dos produtos.

## Como editar o visual
No começo de `css/style.css`, altere as variáveis em `:root`. A cor principal verde da marca está em `--primary`.

## Observações
- As listas são sugestões gerais para cada etapa. A escola pode solicitar materiais, marcas ou quantidades diferentes; confira a lista oficial da instituição antes da compra.
- O carrinho funciona no navegador e salva os itens no `localStorage`.
- O botão de finalizar pedido é demonstrativo. Uma loja real precisa de backend, banco de dados, controle de estoque e integração de pagamento.
- O formulário de novidades também é demonstrativo; ainda não envia e-mails para um serviço externo.
