from database import db


# ---------------------------------------------------------------------------
# Tabelas associativas
# ---------------------------------------------------------------------------

class PessoaProjeto(db.Model):
    """Vínculo N:N entre pessoa e projeto, com a função da pessoa naquele projeto."""
    __tablename__ = "pessoa_projeto"

    pessoa_id = db.Column(db.Integer, db.ForeignKey("pessoa.id"), primary_key=True)
    projeto_id = db.Column(db.Integer, db.ForeignKey("projeto.id"), primary_key=True)
    funcao = db.Column(db.String(80))  # ex.: líder, membro, colaborador

    pessoa = db.relationship("Pessoa", back_populates="projetos_assoc")
    projeto = db.relationship("Projeto", back_populates="pessoas_assoc")

    def __repr__(self):
        return f"<PessoaProjeto pessoa={self.pessoa_id} projeto={self.projeto_id}>"


class PessoaCompeticao(db.Model):
    """Vínculo N:N direto entre pessoa e competição (independe de projeto),
    para papéis como organização ou apoio."""
    __tablename__ = "pessoa_competicao"

    pessoa_id = db.Column(db.Integer, db.ForeignKey("pessoa.id"), primary_key=True)
    competicao_id = db.Column(db.Integer, db.ForeignKey("competicao.id"), primary_key=True)
    funcao = db.Column(db.String(80))  # ex.: organização, apoio, competidor

    pessoa = db.relationship("Pessoa", back_populates="competicoes_assoc")
    competicao = db.relationship("Competicao", back_populates="pessoas_assoc")

    def __repr__(self):
        return f"<PessoaCompeticao pessoa={self.pessoa_id} competicao={self.competicao_id}>"


# Projeto <-> Competição não precisa de campo extra (o "ano" já mora na
# própria Competicao), então é uma tabela associativa simples.
projeto_competicao = db.Table(
    "projeto_competicao",
    db.Column("projeto_id", db.Integer, db.ForeignKey("projeto.id"), primary_key=True),
    db.Column("competicao_id", db.Integer, db.ForeignKey("competicao.id"), primary_key=True),
)


# ---------------------------------------------------------------------------
# Entidades principais
# ---------------------------------------------------------------------------

class Pessoa(db.Model):
    __tablename__ = "pessoa"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    resumo = db.Column(db.Text)  # bio curta, escrita pela própria pessoa
    linkedin_url = db.Column(db.String(255))
    github_url = db.Column(db.String(255))
    portfolio_url = db.Column(db.String(255))

    projetos_assoc = db.relationship("PessoaProjeto", back_populates="pessoa")
    competicoes_assoc = db.relationship("PessoaCompeticao", back_populates="pessoa")

    def __repr__(self):
        return f"<Pessoa {self.nome}>"


class Competicao(db.Model):
    __tablename__ = "competicao"

    id = db.Column(db.Integer, primary_key=True)
    categoria = db.Column(db.String(80), nullable=False)
    ano = db.Column(db.Integer, nullable=False)
    congresso = db.Column(db.String(120), nullable=False)

    projetos = db.relationship("Projeto", secondary=projeto_competicao, back_populates="competicoes")
    pessoas_assoc = db.relationship("PessoaCompeticao", back_populates="competicao")

    def __repr__(self):
        return f"<Competicao {self.categoria} {self.ano}>"


class Projeto(db.Model):
    __tablename__ = "projeto"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    area = db.Column(db.String(50), nullable=False)  # TI, Engenharia, Concreto, Dosagem...
    descricao = db.Column(db.Text)

    competicoes = db.relationship("Competicao", secondary=projeto_competicao, back_populates="projetos")
    pessoas_assoc = db.relationship("PessoaProjeto", back_populates="projeto")

    def __repr__(self):
        return f"<Projeto {self.nome}>"


# ---------------------------------------------------------------------------
# Ainda não definidos — campos abaixo são sugestão inicial, ajuste livremente
# ---------------------------------------------------------------------------

class Noticia(db.Model):
    __tablename__ = "noticia"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    resumo = db.Column(db.String(300))
    conteudo = db.Column(db.Text)
    data_publicacao = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f"<Noticia {self.titulo}>"


class Patrocinador(db.Model):
    __tablename__ = "patrocinador"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    nivel = db.Column(db.String(50))  # ex.: ouro, prata, bronze
    logo_url = db.Column(db.String(255))
    site_url = db.Column(db.String(255))

    def __repr__(self):
        return f"<Patrocinador {self.nome}>"
