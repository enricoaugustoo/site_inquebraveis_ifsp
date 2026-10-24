# Os Inquebráveis — site da equipe

Site em React (Vite), **sem backend e sem banco de dados**. Todo o conteúdo mora em arquivos
da pasta `src/data/`. Para atualizar o site, você edita um arquivo, salva e publica de novo.

## Rodar no seu computador

Precisa do [Node.js](https://nodejs.org) (versão 18 ou mais nova).

```bash
npm install     # só na primeira vez
npm run dev     # abre em http://localhost:5173 e atualiza sozinho ao salvar
```

## Onde mudar cada coisa

| O que | Onde |
|---|---|
| Pessoas da equipe | `src/data/pessoas.js` |
| Projetos (e quem participa de cada um) | `src/data/projetos.js` |
| Competições (e organização/apoio) | `src/data/competicoes.js` |
| Notícias | `src/data/noticias.js` |
| Apoiadores / patrocinadores | `src/data/patrocinadores.js` |
| Cores, fontes, tamanhos | `src/styles/style.css` (variáveis no topo) |
| Menu, cabeçalho e rodapé | `src/components/Layout.jsx` |
| Texto da página inicial | `src/pages/Home.jsx` |
| Logo | `public/img/logomarca-equipe.png` |

Cada arquivo de dados tem um comentário no topo explicando como adicionar um item: copie um
bloco, troque o `id`/`slug` por um nome único (sem acento nem espaço) e preencha.

## Como as relações funcionam

Você escreve cada vínculo **uma vez só**; o site mostra nos dois lados.

- Em `projetos.js`, o projeto lista seus `membros` (id da pessoa + função) e suas `competicoes`
  (ids). Com isso aparecem sozinhos: a equipe na página do projeto, os projetos na página da
  competição e a "trajetória" no perfil de cada pessoa.
- Em `competicoes.js`, o campo `apoio` é para quem se liga direto à competição sem passar por
  projeto (organização, orientação...).

Se um `id` estiver escrito errado, o item some da lista em vez de quebrar o site.

## Imagens

Coloque os arquivos em `public/img/` (subpastas `pessoas/`, `projetos/`, `noticias/`, `apoio/`)
e escreva o caminho a partir de `img/`, por exemplo `foto: "pessoas/maria.webp"`.
Dica: use `.webp` ou `.jpg` com até ~300 KB por imagem para o site carregar rápido.

## Publicar

```bash
npm run build   # gera a pasta dist/
```

Envie a pasta `dist/` para qualquer hospedagem de site estático (Netlify, Vercel, Cloudflare
Pages ou GitHub Pages). No Netlify, dá para simplesmente arrastar a pasta `dist` para a página
de deploy.

As URLs usam `#` (ex.: `site.com/#/projetos`) para funcionar em qualquer hospedagem sem
configuração. Se quiser URLs limpas (`site.com/projetos`), troque `HashRouter` por
`BrowserRouter` em `src/main.jsx` e configure a hospedagem para redirecionar todas as rotas
para `index.html` (no Netlify: arquivo `public/_redirects` com a linha `/* /index.html 200`).

## Se um dia o site crescer

Os campos dos objetos seguem o mesmo formato das tabelas do banco antigo (pessoa, projeto,
competição, vínculos com função). Migrar para um banco ou CMS depois não exige refazer as páginas:
basta trocar a origem dos dados em `src/data/index.js`.
