import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    descricao: "",
    sku: "",
    imagem: "",
    descricao_complementar: "",
    preco: ""
  });

  useEffect(() => {
    async function carregarProduto() {
      try {
        const res = await axios.get(`http://localhost:3000/produtos/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Erro ao carregar produto", err);
        alert("Erro ao carregar produto.");
      }
    }

    carregarProduto();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { saldo, ...dadosParaSalvar } = formData;

  try {
    await axios.put(`http://localhost:3000/produtos/${id}`, dadosParaSalvar, {
      headers: { "Content-Type": "application/json" }
    });
    alert("✅ Produto atualizado com sucesso!");
    navigate("/");
  } catch (error) {
    console.error("❌ Erro ao atualizar produto:", error);
    alert("❌ Erro ao atualizar produto. Veja o console.");
  }
};

  return (
    <div>
      <button className="btn-voltar" onClick={() => navigate("/")}>🔙 voltar</button>
      <h2 style={{ marginLeft: "10px" }}>Editar produto</h2>
      <p className="subtitulo">dados gerais</p>

      <form onSubmit={handleSubmit}>
        <label>Descrição</label>
        <input
          name="descricao"
          value={formData.descricao}
          onChange={handleInput}
          required
        />

        <div className="form-linha">
          <div>
            <label>Código (SKU)</label>
            <input
              name="sku"
              value={formData.sku}
              onChange={handleInput}
              required
            />
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
          onChange={handleInput}
        />

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
              style={{ maxWidth: "150px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
          </div>
        )}

        <button type="submit">salvar</button>
      </form>
    </div>
  );
}
