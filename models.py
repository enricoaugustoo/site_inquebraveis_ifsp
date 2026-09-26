from database import db


class PessoaProjeto(db.Model):
    __tablename__ = "pessoa_projeto"

    pessoa_id = db.Column(
        db.Integer,
        db.ForeignKey("pessoa.id"),
        primary_key=True
    )

    projeto_id = db.Column(
        db.Integer,
        db.ForeignKey("projeto.id"),
        primary_key=True
    )

    funcao = db.Column(db.String(120))

    pessoa = db.relationship(
        "Pessoa",
        back_populates="projetos_assoc"
    )

    projeto = db.relationship(
        "Projeto",
        back_populates="pessoas_assoc"
    )


class PessoaCompeticao(db.Model):
    __tablename__ = "pessoa_competicao"

    pessoa_id = db.Column(
        db.Integer,
        db.ForeignKey("pessoa.id"),
        primary_key=True
    )

    competicao_id = db.Column(
        db.Integer,
        db.ForeignKey("competicao.id"),
        primary_key=True
    )

    funcao = db.Column(db.String(120))

    pessoa = db.relationship(
        "Pessoa",
        back_populates="competicoes_assoc"
    )

    competicao = db.relationship(
        "Competicao",
        back_populates="pessoas_assoc"
    )


projeto_competicao = db.Table(
    "projeto_competicao",

    db.Column(
        "projeto_id",
        db.Integer,
        db.ForeignKey("projeto.id", ondelete="CASCADE"),
        primary_key=True
    ),

    db.Column(
        "competicao_id",
        db.Integer,
        db.ForeignKey("competicao.id", ondelete="CASCADE"),
        primary_key=True
    )
)


class Pessoa(db.Model):
    __tablename__ = "pessoa"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nome = db.Column(
        db.String(120),
        nullable=False
    )

    Setor = db.Column(
        db.String(120)
    )

    Cargo = db.Column(
        db.String(120)
    )

    email = db.Column(
        db.String(120)
    )

    resumo = db.Column(
        db.Text
    )

    linkedin_url = db.Column(
        db.String(255)
    )

    github_url = db.Column(
        db.String(255)
    )

    lattes_url = db.Column(
        db.String(255)
    )

    portfolio_url = db.Column(
        db.String(255)
    )

    projetos_assoc = db.relationship(
        "PessoaProjeto",
        back_populates="pessoa",
        cascade="all, delete-orphan"
    )

    competicoes_assoc = db.relationship(
        "PessoaCompeticao",
        back_populates="pessoa",
        cascade="all, delete-orphan"
    )


class Competicao(db.Model):
    __tablename__ = "competicao"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    categoria = db.Column(
        db.String(120)
    )

    ano = db.Column(
        db.Integer
    )

    congresso = db.Column(
        db.String(120)
    )

    projetos = db.relationship(
        "Projeto",
        secondary=projeto_competicao,
        back_populates="competicoes"
    )

    pessoas_assoc = db.relationship(
        "PessoaCompeticao",
        back_populates="competicao",
        cascade="all, delete-orphan"
    )


class Projeto(db.Model):
    __tablename__ = "projeto"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nome = db.Column(
        db.String(120),
        nullable=False
    )

    slug = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    area = db.Column(
        db.String(120)
    )

    descricao = db.Column(
        db.Text
    )

    competicoes = db.relationship(
        "Competicao",
        secondary=projeto_competicao,
        back_populates="projetos"
    )

    pessoas_assoc = db.relationship(
        "PessoaProjeto",
        back_populates="projeto",
        cascade="all, delete-orphan"
    )


class Noticia(db.Model):
    __tablename__ = "noticia"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    titulo = db.Column(
        db.String(200),
        nullable=False
    )

    slug = db.Column(
        db.String(200),
        unique=True,
        nullable=False
    )

    resumo = db.Column(
        db.Text
    )

    conteudo = db.Column(
        db.Text
    )

    data_publicacao = db.Column(
        db.Date
    )


class Patrocinador(db.Model):
    __tablename__ = "patrocinador"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nome = db.Column(
        db.String(120),
        nullable=False
    )

    nivel = db.Column(
        db.String(120)
    )

    logo_url = db.Column(
        db.String(255)
    )

    site_url = db.Column(
        db.String(255)
    )