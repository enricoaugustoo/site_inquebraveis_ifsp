import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/style.css";

// HashRouter: as URLs ficam como  site.com/#/projetos  e funcionam em qualquer
// hospedagem sem configuração. Para URLs limpas (site.com/projetos), troque por
// BrowserRouter e configure o redirecionamento de rotas na hospedagem (ver README).
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
