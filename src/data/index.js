// Camada de acesso aos dados. As relações são escritas UMA vez nos arquivos
// de dados e calculadas aqui, para as duas pontas aparecerem sozinhas
// (ex.: o vínculo pessoa↔projeto aparece no projeto e no perfil da pessoa).
import { pessoas } from "./pessoas";
import { projetos } from "./projetos";
import { competicoes } from "./competicoes";
import { noticias } from "./noticias";
import { patrocinadores } from "./patrocinadores";

export { pessoas, projetos, competicoes, noticias, patrocinadores };

const pessoaPorId = new Map(pessoas.map((p) => [p.id, p]));
const projetoPorSlug = new Map(projetos.map((p) => [p.slug, p]));
const competicaoPorId = new Map(competicoes.map((c) => [c.id, c]));

export const getPessoa = (id) => pessoaPorId.get(id);
export const getProjeto = (slug) => projetoPorSlug.get(slug);
export const getCompeticao = (id) => competicaoPorId.get(id);
export const getNoticia = (slug) => noticias.find((n) => n.slug === slug);

// Ordenações
export const noticiasRecentes = () =>
  [...noticias].sort((a, b) => b.data.localeCompare(a.data));
export const competicoesRecentes = () =>
  [...competicoes].sort((a, b) => b.ano - a.ano);

// Projeto → pessoas e competições (já resolvidas em objetos)
export const equipeDoProjeto = (projeto) =>
  projeto.membros
    .map((m) => ({ pessoa: getPessoa(m.pessoa), funcao: m.funcao }))
    .filter((m) => m.pessoa);

export const competicoesDoProjeto = (projeto) =>
  projeto.competicoes.map(getCompeticao).filter(Boolean);

// Competição → projetos e pessoas da equipe
export const projetosDaCompeticao = (competicaoId) =>
  projetos.filter((p) => p.competicoes.includes(competicaoId));

export const equipeDaCompeticao = (competicao) =>
  (competicao.equipe || [])
    .map((a) => ({ pessoa: getPessoa(a.pessoa), funcao: a.funcao }))
    .filter((a) => a.pessoa);

// Pessoa → "árvore": projetos (com função e competições do projeto)
// e participações diretas em competições (organização/equipe)
export const projetosDaPessoa = (pessoaId) =>
  projetos
    .map((projeto) => {
      const vinculo = projeto.membros.find((m) => m.pessoa === pessoaId);
      return vinculo
        ? { projeto, funcao: vinculo.funcao, competicoes: competicoesDoProjeto(projeto) }
        : null;
    })
    .filter(Boolean);

export const participacoesDaPessoa = (pessoaId) =>
  competicoes
    .map((competicao) => {
      const vinculo = (competicao.equipe || []).find((a) => a.pessoa === pessoaId);
      return vinculo ? { competicao, funcao: vinculo.funcao } : null;
    })
    .filter(Boolean);

// Utilitários
export const dataBR = (iso) => iso.split("-").reverse().join(".");
export const paragrafos = (texto) =>
  texto.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);
export const imagemUrl = (caminho) => (caminho ? `./img/${caminho}` : "");
