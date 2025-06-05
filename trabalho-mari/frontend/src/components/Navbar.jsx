import { useNavigate } from "react-router-dom";

export default function Navbar({ aba, setAba }) {
  const navigate = useNavigate();

  const handleNavegacao = (pagina) => {
    setAba(pagina);
    navigate(pagina === "produtos" ? "/" : "/estoque");
  };

  return (
    <div className="sidebar">
  <div className="logo">
    <img src="/logo.png" alt="DecoArt" style={{ width: "200px" }} />
  </div>

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
</div>
  );
}
