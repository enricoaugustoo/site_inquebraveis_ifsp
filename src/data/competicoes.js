// ─────────────────────────────────────────────────────────────
// COMPETIÇÕES
// "id" é único e vira a URL: /competicoes/apo-2026
// "equipe" = pessoas ligadas à competição direto, sem passar por projeto.
// Use o "id" da pessoa.
// Os projetos da competição NÃO se escrevem aqui: eles são calculados a
// partir do campo "competicoes" de cada projeto (projetos.js).
// ─────────────────────────────────────────────────────────────
export const competicoes = [
  {
    id: "apo-2026",
    categoria: "APO",
    ano: 2026,
    congresso: "67 CBC - IBRACON",
    descricao: "Otimização das seções transversais de vigas e pilares de um pórtico 3D.",
    resultado: "",
    equipe: [
      { pessoa: "jose-americo-salvador", funcao: "Orientador" },
      { pessoa: "enrico-souza", funcao: "Capitão" },
      { pessoa: "alicia-freire", funcao: "Integrante" },
      { pessoa: "andre-rocha", funcao: "Integrante" },
      { pessoa: "eduardo-silva", funcao: "Integrante" },
      { pessoa: "emilly-silva", funcao: "Integrante" },
      { pessoa: "maria-eduarda-santos", funcao: "Integrante" },
      { pessoa: "bruna-nascimento", funcao: "Integrante" },
      { pessoa: "higor-radionoff", funcao: "Integrante" },
      { pessoa: "julia-oliveira", funcao: "Integrante" },
    ],
  },
  {
    id: "concrebol-2026",
    categoria: "Concrebol",
    ano: 2026,
    congresso: "67 CBC - IBRACON",
    descricao: "",
    resultado: "",
    equipe: [
      { pessoa: "jose-americo-salvador", funcao: "Orientador" },
      { pessoa: "enrico-souza", funcao: "Capitão" },
      { pessoa: "alicia-freire", funcao: "Integrante" },
      { pessoa: "andre-rocha", funcao: "Integrante" },
      { pessoa: "eduardo-silva", funcao: "Integrante" },
      { pessoa: "emilly-silva", funcao: "Integrante" },
      { pessoa: "maria-eduarda-santos", funcao: "Integrante" },
      { pessoa: "maria-elisa-freitas", funcao: "Integrante" },
      { pessoa: "manuela-ribeiro", funcao: "Integrante" },
      { pessoa: "luis-machado", funcao: "Integrante" },
    ],
  },
  {
    id: "COCAR-2025",
    categoria: "COCAR",
    ano: 2025,
    congresso: "66 CBC - IBRACON",
    descricao: "Desenvolvimento de corpos de prova coloridos (rosa) com resistência a compressão alvo de 115MPa ",
    resultado: "",
    equipe: [
      { pessoa: "jose-americo-salvador", funcao: "Orientador" },
      { pessoa: "enrico-souza", funcao: "Integrante" },
      { pessoa: "alicia-freire", funcao: "Capitã" },
      { pessoa: "andre-rocha", funcao: "Integrante" },
      { pessoa: "eduardo-silva", funcao: "Integrante" },
      { pessoa: "emilly-silva", funcao: "Integrante" },
      { pessoa: "maria-eduarda-santos", funcao: "Integrante" },
    ],
  },

];
