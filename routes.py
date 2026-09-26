from flask import render_template, request
from models import Projeto, Competicao, Pessoa, Noticia, Patrocinador


def register_routes(app):

    # --- Home (hub) ---
    @app.route("/")
    def home():
        return render_template(
            "home.html",
            noticias=Noticia.query.order_by(Noticia.data_publicacao.desc()).limit(3).all(),
            projetos=Projeto.query.limit(3).all(),
            competicoes=Competicao.query.order_by(Competicao.ano.desc()).limit(1).all(),
            membros=Pessoa.query.limit(4).all(),
        )

    # --- Notícias ---
    @app.route("/noticias")
    def lista_noticias():
        noticias = Noticia.query.order_by(Noticia.data_publicacao.desc()).all()
        return render_template("noticias/lista.html", noticias=noticias)

    @app.route("/noticias/<slug>")
    def detalhe_noticia(slug):
        noticia = Noticia.query.filter_by(slug=slug).first_or_404()
        return render_template("noticias/detalhe.html", noticia=noticia)

    # --- Projetos ---
    @app.route("/projetos")
    def lista_projetos():
        area = request.args.get("area")  # filtro opcional: /projetos?area=Concreto
        query = Projeto.query
        if area:
            query = query.filter_by(area=area)
        return render_template("projetos/lista.html", projetos=query.all())

    @app.route("/projetos/<slug>")
    def detalhe_projeto(slug):
        projeto = Projeto.query.filter_by(slug=slug).first_or_404()
        return render_template("projetos/detalhe.html", projeto=projeto)

    # --- Competições ---
    @app.route("/competicoes")
    def lista_competicoes():
        competicoes = Competicao.query.order_by(Competicao.ano.desc()).all()
        return render_template("competicoes/lista.html", competicoes=competicoes)

    @app.route("/competicoes/<int:competicao_id>")
    def detalhe_competicao(competicao_id):
        competicao = Competicao.query.get_or_404(competicao_id)
        return render_template("competicoes/detalhe.html", competicao=competicao)

    # --- Membros ---
    @app.route("/membros")
    def lista_membros():
        membros = Pessoa.query.all()
        return render_template("membros/lista.html", membros=membros)

    @app.route("/membros/<int:pessoa_id>")
    def detalhe_membro(pessoa_id):
        pessoa = Pessoa.query.get_or_404(pessoa_id)
        return render_template("membros/detalhe.html", pessoa=pessoa)

    # --- Patrocinadores ---
    @app.route("/patrocinadores")
    def lista_patrocinadores():
        patrocinadores = Patrocinador.query.all()
        return render_template("patrocinadores/lista.html", patrocinadores=patrocinadores)
