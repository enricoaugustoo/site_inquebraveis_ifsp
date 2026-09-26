from flask import render_template, request, redirect, url_for, session

from database import db
from models import Pessoa, Competicao, Projeto, Noticia, Patrocinador, PessoaProjeto, PessoaCompeticao
from auth import login_required


def register_admin_routes(app):

    # --- Login / logout ---
    @app.route("/admin/login", methods=["GET", "POST"])
    def admin_login():
        erro = None
        if request.method == "POST":
            if request.form.get("senha") == app.config["ADMIN_PASSWORD"]:
                session["admin_logado"] = True
                return redirect(url_for("admin_dashboard"))
            erro = "Senha incorreta."
        return render_template("admin/login.html", erro=erro)

    @app.route("/admin/logout")
    def admin_logout():
        session.pop("admin_logado", None)
        return redirect(url_for("admin_login"))

    @app.route("/admin")
    @login_required
    def admin_dashboard():
        return render_template("admin/dashboard.html")

    # -----------------------------------------------------------------
    # Pessoas
    # -----------------------------------------------------------------
    @app.route("/admin/pessoas")
    @login_required
    def admin_lista_pessoas():
        return render_template("admin/pessoas.html", pessoas=Pessoa.query.all())

    @app.route("/admin/pessoas/nova", methods=["GET", "POST"])
    @login_required
    def admin_nova_pessoa():
        if request.method == "POST":
            db.session.add(Pessoa(
                nome=request.form["nome"],
                email=request.form["email"],
                resumo=request.form.get("resumo", ""),
                linkedin_url=request.form.get("linkedin_url", ""),
                github_url=request.form.get("github_url", ""),
                portfolio_url=request.form.get("portfolio_url", ""),
            ))
            db.session.commit()
            return redirect(url_for("admin_lista_pessoas"))
        return render_template("admin/pessoa_form.html", pessoa=None)

    @app.route("/admin/pessoas/<int:pessoa_id>/editar", methods=["GET", "POST"])
    @login_required
    def admin_editar_pessoa(pessoa_id):
        pessoa = Pessoa.query.get_or_404(pessoa_id)
        if request.method == "POST":
            pessoa.nome = request.form["nome"]
            pessoa.email = request.form["email"]
            pessoa.resumo = request.form.get("resumo", "")
            pessoa.linkedin_url = request.form.get("linkedin_url", "")
            pessoa.github_url = request.form.get("github_url", "")
            pessoa.portfolio_url = request.form.get("portfolio_url", "")
            db.session.commit()
            return redirect(url_for("admin_lista_pessoas"))
        return render_template("admin/pessoa_form.html", pessoa=pessoa)

    @app.route("/admin/pessoas/<int:pessoa_id>/excluir", methods=["POST"])
    @login_required
    def admin_excluir_pessoa(pessoa_id):
        db.session.delete(Pessoa.query.get_or_404(pessoa_id))
        db.session.commit()
        return redirect(url_for("admin_lista_pessoas"))

    # -----------------------------------------------------------------
    # Projetos (+ membros e competições vinculadas)
    # -----------------------------------------------------------------
    @app.route("/admin/projetos")
    @login_required
    def admin_lista_projetos():
        return render_template("admin/projetos.html", projetos=Projeto.query.all())

    @app.route("/admin/projetos/novo", methods=["GET", "POST"])
    @login_required
    def admin_novo_projeto():
        if request.method == "POST":
            projeto = Projeto(
                nome=request.form["nome"],
                slug=request.form["slug"],
                area=request.form["area"],
                descricao=request.form.get("descricao", ""),
            )
            db.session.add(projeto)
            db.session.commit()
            return redirect(url_for("admin_editar_projeto", projeto_id=projeto.id))
        return render_template("admin/projeto_form.html", projeto=None, pessoas=None, competicoes=None)

    @app.route("/admin/projetos/<int:projeto_id>/editar", methods=["GET", "POST"])
    @login_required
    def admin_editar_projeto(projeto_id):
        projeto = Projeto.query.get_or_404(projeto_id)
        if request.method == "POST":
            projeto.nome = request.form["nome"]
            projeto.slug = request.form["slug"]
            projeto.area = request.form["area"]
            projeto.descricao = request.form.get("descricao", "")
            db.session.commit()
            return redirect(url_for("admin_editar_projeto", projeto_id=projeto.id))
        return render_template(
            "admin/projeto_form.html",
            projeto=projeto,
            pessoas=Pessoa.query.all(),
            competicoes=Competicao.query.all(),
        )

    @app.route("/admin/projetos/<int:projeto_id>/excluir", methods=["POST"])
    @login_required
    def admin_excluir_projeto(projeto_id):
        db.session.delete(Projeto.query.get_or_404(projeto_id))
        db.session.commit()
        return redirect(url_for("admin_lista_projetos"))

    @app.route("/admin/projetos/<int:projeto_id>/membros", methods=["POST"])
    @login_required
    def admin_add_membro_projeto(projeto_id):
        db.session.add(PessoaProjeto(
            pessoa_id=request.form["pessoa_id"],
            projeto_id=projeto_id,
            funcao=request.form.get("funcao", ""),
        ))
        db.session.commit()
        return redirect(url_for("admin_editar_projeto", projeto_id=projeto_id))

    @app.route("/admin/projetos/<int:projeto_id>/membros/<int:pessoa_id>/remover", methods=["POST"])
    @login_required
    def admin_remove_membro_projeto(projeto_id, pessoa_id):
        db.session.delete(PessoaProjeto.query.get_or_404((pessoa_id, projeto_id)))
        db.session.commit()
        return redirect(url_for("admin_editar_projeto", projeto_id=projeto_id))

    @app.route("/admin/projetos/<int:projeto_id>/competicoes", methods=["POST"])
    @login_required
    def admin_add_competicao_projeto(projeto_id):
        projeto = Projeto.query.get_or_404(projeto_id)
        competicao = Competicao.query.get_or_404(request.form["competicao_id"])
        if competicao not in projeto.competicoes:
            projeto.competicoes.append(competicao)
            db.session.commit()
        return redirect(url_for("admin_editar_projeto", projeto_id=projeto_id))

    @app.route("/admin/projetos/<int:projeto_id>/competicoes/<int:competicao_id>/remover", methods=["POST"])
    @login_required
    def admin_remove_competicao_projeto(projeto_id, competicao_id):
        projeto = Projeto.query.get_or_404(projeto_id)
        competicao = Competicao.query.get_or_404(competicao_id)
        if competicao in projeto.competicoes:
            projeto.competicoes.remove(competicao)
            db.session.commit()
        return redirect(url_for("admin_editar_projeto", projeto_id=projeto_id))

    # -----------------------------------------------------------------
    # Competições (+ organização/apoio)
    # -----------------------------------------------------------------
    @app.route("/admin/competicoes")
    @login_required
    def admin_lista_competicoes():
        return render_template("admin/competicoes.html", competicoes=Competicao.query.all())

    @app.route("/admin/competicoes/nova", methods=["GET", "POST"])
    @login_required
    def admin_nova_competicao():
        if request.method == "POST":
            competicao = Competicao(
                categoria=request.form["categoria"],
                ano=request.form["ano"],
                congresso=request.form["congresso"],
            )
            db.session.add(competicao)
            db.session.commit()
            return redirect(url_for("admin_editar_competicao", competicao_id=competicao.id))
        return render_template("admin/competicao_form.html", competicao=None, pessoas=None)

    @app.route("/admin/competicoes/<int:competicao_id>/editar", methods=["GET", "POST"])
    @login_required
    def admin_editar_competicao(competicao_id):
        competicao = Competicao.query.get_or_404(competicao_id)
        if request.method == "POST":
            competicao.categoria = request.form["categoria"]
            competicao.ano = request.form["ano"]
            competicao.congresso = request.form["congresso"]
            db.session.commit()
            return redirect(url_for("admin_editar_competicao", competicao_id=competicao.id))
        return render_template("admin/competicao_form.html", competicao=competicao, pessoas=Pessoa.query.all())

    @app.route("/admin/competicoes/<int:competicao_id>/excluir", methods=["POST"])
    @login_required
    def admin_excluir_competicao(competicao_id):
        db.session.delete(Competicao.query.get_or_404(competicao_id))
        db.session.commit()
        return redirect(url_for("admin_lista_competicoes"))

    @app.route("/admin/competicoes/<int:competicao_id>/pessoas", methods=["POST"])
    @login_required
    def admin_add_pessoa_competicao(competicao_id):
        db.session.add(PessoaCompeticao(
            pessoa_id=request.form["pessoa_id"],
            competicao_id=competicao_id,
            funcao=request.form.get("funcao", ""),
        ))
        db.session.commit()
        return redirect(url_for("admin_editar_competicao", competicao_id=competicao_id))

    @app.route("/admin/competicoes/<int:competicao_id>/pessoas/<int:pessoa_id>/remover", methods=["POST"])
    @login_required
    def admin_remove_pessoa_competicao(competicao_id, pessoa_id):
        db.session.delete(PessoaCompeticao.query.get_or_404((pessoa_id, competicao_id)))
        db.session.commit()
        return redirect(url_for("admin_editar_competicao", competicao_id=competicao_id))

    # -----------------------------------------------------------------
    # Notícias
    # -----------------------------------------------------------------
    @app.route("/admin/noticias")
    @login_required
    def admin_lista_noticias():
        return render_template("admin/noticias.html", noticias=Noticia.query.order_by(Noticia.data_publicacao.desc()).all())

    @app.route("/admin/noticias/nova", methods=["GET", "POST"])
    @login_required
    def admin_nova_noticia():
        if request.method == "POST":
            db.session.add(Noticia(
                titulo=request.form["titulo"],
                slug=request.form["slug"],
                resumo=request.form.get("resumo", ""),
                conteudo=request.form.get("conteudo", ""),
                data_publicacao=request.form["data_publicacao"],
            ))
            db.session.commit()
            return redirect(url_for("admin_lista_noticias"))
        return render_template("admin/noticia_form.html", noticia=None)

    @app.route("/admin/noticias/<int:noticia_id>/editar", methods=["GET", "POST"])
    @login_required
    def admin_editar_noticia(noticia_id):
        noticia = Noticia.query.get_or_404(noticia_id)
        if request.method == "POST":
            noticia.titulo = request.form["titulo"]
            noticia.slug = request.form["slug"]
            noticia.resumo = request.form.get("resumo", "")
            noticia.conteudo = request.form.get("conteudo", "")
            noticia.data_publicacao = request.form["data_publicacao"]
            db.session.commit()
            return redirect(url_for("admin_lista_noticias"))
        return render_template("admin/noticia_form.html", noticia=noticia)

    @app.route("/admin/noticias/<int:noticia_id>/excluir", methods=["POST"])
    @login_required
    def admin_excluir_noticia(noticia_id):
        db.session.delete(Noticia.query.get_or_404(noticia_id))
        db.session.commit()
        return redirect(url_for("admin_lista_noticias"))

    # -----------------------------------------------------------------
    # Patrocinadores
    # -----------------------------------------------------------------
    @app.route("/admin/patrocinadores")
    @login_required
    def admin_lista_patrocinadores():
        return render_template("admin/patrocinadores.html", patrocinadores=Patrocinador.query.all())

    @app.route("/admin/patrocinadores/novo", methods=["GET", "POST"])
    @login_required
    def admin_novo_patrocinador():
        if request.method == "POST":
            db.session.add(Patrocinador(
                nome=request.form["nome"],
                nivel=request.form.get("nivel", ""),
                logo_url=request.form.get("logo_url", ""),
                site_url=request.form.get("site_url", ""),
            ))
            db.session.commit()
            return redirect(url_for("admin_lista_patrocinadores"))
        return render_template("admin/patrocinador_form.html", patrocinador=None)

    @app.route("/admin/patrocinadores/<int:patrocinador_id>/editar", methods=["GET", "POST"])
    @login_required
    def admin_editar_patrocinador(patrocinador_id):
        patrocinador = Patrocinador.query.get_or_404(patrocinador_id)
        if request.method == "POST":
            patrocinador.nome = request.form["nome"]
            patrocinador.nivel = request.form.get("nivel", "")
            patrocinador.logo_url = request.form.get("logo_url", "")
            patrocinador.site_url = request.form.get("site_url", "")
            db.session.commit()
            return redirect(url_for("admin_lista_patrocinadores"))
        return render_template("admin/patrocinador_form.html", patrocinador=patrocinador)

    @app.route("/admin/patrocinadores/<int:patrocinador_id>/excluir", methods=["POST"])
    @login_required
    def admin_excluir_patrocinador(patrocinador_id):
        db.session.delete(Patrocinador.query.get_or_404(patrocinador_id))
        db.session.commit()
        return redirect(url_for("admin_lista_patrocinadores"))
