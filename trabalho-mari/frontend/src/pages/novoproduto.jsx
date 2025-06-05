import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NovoProduto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descricao: "",
    sku: "",
    imagem: "",
    descricao_complementar: "",
    preco: "",
    saldo: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔍 Dados enviados:", formData);
    try {
      const response = await axios.post("http://localhost:3000/produtos", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("✅ Produto salvo:", response.data);
      alert("✅ Produto cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("❌ Erro ao cadastrar produto:", error);
      alert("❌ Erro ao salvar produto. Veja o console.");
    }
  };

  return (
    <div>
      <button className="btn-voltar" onClick={() => navigate("/")}>🔙 voltar</button>
      <h2 style={{ marginLeft: "10px" }}>Novo produto</h2>
      <p className="subtitulo">dados gerais</p>
      <form onSubmit={handleSubmit}>
        <label>Descrição</label>
        <input
          name="descricao"
          value={formData.descricao}
          onChange={handleInput}
          required />
        <div className="form-linha">
          <div>
            <label>Código (SKU)</label>
            <input
              name="sku"
              value={formData.sku}
              onChange={handleInput}
              required />
          </div>
          <div>
            <label>Preço de venda</label>
            <input
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleInput}
              required
            />
          </div>
        </div>

        <label>Descrição complementar</label>
        <textarea
          name="descricao_complementar"
          value={formData.descricao_complementar}
          onChange={handleInput} />

        <label>URL da imagem</label>
        <input
          type="text"
          name="imagem"
          value={formData.imagem}
          onChange={handleInput}
          placeholder="https://..." 
          />
        {formData.imagem && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={formData.imagem}
              alt="Pré-visualização"
              style={{ maxWidth: "150px", borderRadius: "8px", border: "1px solid #ccc" }} />
          </div>
        )}
        <button type="submit">salvar</button>
      </form>
    </div>
  );
}
