import { Link, useParams } from "react-router-dom";
import { getNoticia, dataBR, paragrafos, imagemUrl } from "../data";
import { PageHead, usePageTitle } from "../components/ui";
import NaoEncontrado from "./NaoEncontrado";

export default function NoticiaDetalhe() {
  const { slug } = useParams();
  const noticia = getNoticia(slug);
  usePageTitle(noticia?.titulo);
  if (!noticia) return <NaoEncontrado />;
  const imagem = imagemUrl(noticia.imagem);

  return (
    <>
      <PageHead eyebrow={dataBR(noticia.data)} title={noticia.titulo} lead={noticia.resumo} />
      <section className="section section-light">
        <div className="container container-narrow">
          <Link className="text-link back-link" to="/noticias"><span>←</span> Todas as notícias</Link>
          {imagem && <img className="detail-image" src={imagem} alt="" />}
          <div className="prose">
            {paragrafos(noticia.conteudo).map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </div>
      </section>
    </>
  );
}
