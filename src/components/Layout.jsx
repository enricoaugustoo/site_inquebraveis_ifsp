import { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { imagemUrl } from "../data";

const LINKS = [
  ["/projetos", "Projetos"],
  ["/competicoes", "Competições"],
  ["/equipe", "Equipe"],
  ["/noticias", "Notícias"],
  ["/apoio", "Apoio"],
];

export default function Layout() {
  const [aberto, setAberto] = useState(false);
  const { pathname } = useLocation();

  // a cada troca de página: fecha o menu e volta ao topo
  useEffect(() => {
    setAberto(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="site-header">
        <div className="nav-shell">
          <Link className="brand" to="/" aria-label="Os Inquebráveis — início">
            <img src={imagemUrl("logomarca-equipe.png")} alt="" />
            <span className="brand-name">Os Inquebráveis</span>
          </Link>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={aberto}
            aria-controls="site-nav"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto((v) => !v)}
          >
            <span /><span /><span />
          </button>

          <nav id="site-nav" className={`site-nav${aberto ? " is-open" : ""}`} aria-label="Navegação principal">
            <NavLink to="/" end>Início</NavLink>
            {LINKS.map(([to, texto]) => (
              <NavLink key={to} to={to}>{texto}</NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">OS INQUEBRÁVEIS<span>.</span></div>
            <p>Equipe do IFSP Caraguatatuba.</p>
          </div>
          <div className="footer-links">
            {LINKS.slice(0, 4).map(([to, texto]) => (
              <Link key={to} to={to}>{texto}</Link>
            ))}
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Os Inquebráveis</span>
        </div>
      </footer>
    </>
  );
}
