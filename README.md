# Site da equipe — esqueleto

## Estrutura
```
site-equipe/
├── app.py            # ponto de entrada, cria o app e o banco
├── config.py         # configuração (URI do SQLite, chave secreta)
├── database.py       # instância do SQLAlchemy
├── models.py         # tabelas: Pessoa, Competicao, Projeto, Noticia, Patrocinador
├── routes.py         # todas as rotas, uma por subpágina
├── templates/        # um template por seção (lista + detalhe)
└── static/css/       # estilo com a paleta do guia visual
```

## Como rodar
```bash
pip install -r requirements.txt
python app.py
```
O banco `site_equipe.db` é criado automaticamente na primeira execução (tabelas vazias).

## O que já está definido
- **Pessoa**: id, nome, email
- **Competicao**: id, categoria, ano, congresso
- **Projeto**: id, nome, slug, área, descrição

- **Pessoa ↔ Projeto** (N:N, tabela `pessoa_projeto`): uma pessoa passa por
  vários projetos e um projeto tem vários integrantes. Guarda a `funcao`
  da pessoa naquele projeto (ex.: líder, membro).
- **Projeto ↔ Competição** (N:N, tabela `projeto_competicao`): um projeto
  pode ser levado a mais de uma competição (ex.: reapresentado em outro ano).
- **Pessoa ↔ Competição** (N:N, tabela `pessoa_competicao`): vínculo direto,
  independente de projeto — para organização/apoio na competição. Guarda a
  `funcao` (ex.: organização, apoio, competidor).

Cada seção segue o padrão de rota dinâmica combinado antes: uma única rota
(`/projetos/<slug>`, `/noticias/<slug>`, `/competicoes/<id>`) e um único
template renderizando qualquer registro do banco — sem página estática por item.

## Pontos em aberto (ajuste quando decidir)
- **Noticia** e **Patrocinador**: os campos em `models.py` são só uma sugestão
  inicial para o esqueleto funcionar. Revise antes de popular o banco.
- Foi adicionado um campo `slug` em `Projeto` e `Noticia` — não estava no
  schema que você passou, mas é necessário para a rota dinâmica por URL
  amigável (`/projetos/ponte-estaiada-2026` em vez de `/projetos/3`).
  Se preferir usar o `id` direto, é só trocar o `slug` pelo `id` nas rotas.
- Membros ainda não tem subpágina de detalhe (só a listagem) — adicione se
  quiser uma página por pessoa.
