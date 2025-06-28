import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password: senha
      });

      // salva o token no localStorage
      localStorage.setItem("token", res.data.token);

      // redireciona para a rota protegida
      navigate("/");
    } catch (err) {
      setErro("❌ Usuário ou senha inválidos");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
      <h2>Login</h2>

      {erro && <p style={{ color: "red", marginBottom: "10px" }}>{erro}</p>}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" className="botao-azul" style={{ width: "100%" }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
