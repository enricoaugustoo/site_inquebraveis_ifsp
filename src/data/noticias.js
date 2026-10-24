// ─────────────────────────────────────────────────────────────
// NOTÍCIAS
// "slug" é único e vira a URL: /noticias/equipe-na-competicao
// "data" no formato AAAA-MM-DD.
// "conteudo": escreva entre crases (` `) e separe parágrafos com uma linha em branco.
// Imagem opcional: public/img/noticias/ → "noticias/arquivo.webp".
// ⚠ Dados de EXEMPLO.
// ─────────────────────────────────────────────────────────────
export const noticias = [
  {
    slug: "equipe-na-competicao",
    titulo: "Equipe confirma participação na competição de 2026",
    data: "2026-10-10",
    resumo: "Resumo de uma ou duas linhas que aparece nos cartões.",
    imagem: "",
    conteudo: `Primeiro parágrafo da notícia.

Segundo parágrafo. Basta deixar uma linha em branco entre eles.`,
  },
  {
    slug: "novo-site-no-ar",
    titulo: "Novo site da equipe no ar",
    data: "2026-10-24",
    resumo: "Projetos, competições e pessoas num só lugar.",
    imagem: "",
    conteudo: `Apresentamos o novo site da equipe.

Aqui você acompanha projetos, competições e conhece quem faz parte.`,
  },
];
