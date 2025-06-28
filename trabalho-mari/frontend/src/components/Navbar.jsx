import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ aba, setAba }) {
  const navigate = useNavigate();
  const location = useLocation();
  const estaNaTelaDeLogin = location.pathname === "/login";

  const handleNavegacao = (pagina) => {
    setAba(pagina);
    navigate(pagina === "produtos" ? "/" : "/estoque");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar" style={{ display: "flex", flexDirection: "column" }}>
      <div className="logo">
        <img src="/logo.png" alt="DecoArt" style={{ width: "200px" }} />
      </div>

      {!estaNaTelaDeLogin && (
        <div style={{ width: "100%", marginTop: "10px" }}>
          <button
            className={aba === "produtos" ? "active" : ""}
            onClick={() => handleNavegacao("produtos")}
          >
            Produtos
          </button>
          <button
            className={aba === "estoque" ? "active" : ""}
            onClick={() => handleNavegacao("estoque")}
          >
            Estoque
          </button>
        </div>
      )}

      {!estaNaTelaDeLogin && (
        <div style={{ marginTop: "auto", width: "100%", padding: "20px" }}>
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}
    </div>
  );
}
