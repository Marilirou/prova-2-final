import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Estoque() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [saldos, setSaldos] = useState({});

  useEffect(() => {
    const carregarTudo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/produtos");
        setProdutos(res.data);
        buscarSaldos(res.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };

    carregarTudo();
  }, []);

  const buscarSaldos = async (produtos) => {
    const novosSaldos = {};
    for (const p of produtos) {
      try {
        const res = await axios.get(`http://localhost:3000/lancamentos/${p._id}`);
        const lancs = res.data;

        let saldo = 0;
        lancs.forEach((l) => {
          if (l.tipo === "entrada") saldo += l.quantidade;
          else if (l.tipo === "saida") saldo -= l.quantidade;
          else if (l.tipo === "balanco") saldo = l.quantidade;
        });

        novosSaldos[p._id] = saldo;
      } catch (err) {
        console.error("Erro ao buscar lançamentos do produto", p._id, err);
        novosSaldos[p._id] = 0;
      }
    }

    setSaldos(novosSaldos);
  };

  const produtosFiltrados = produtos.filter((p) =>
    p.sku?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <h2>Estoque</h2>

      <div className="busca-container">
        <input
          type="text"
          placeholder="Pesquise pelo código (SKU) do produto"
          className="campo-busca"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button className="lupa">🔍</button>
      </div>

      <table className="estoque-table">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Descrição</th>
            <th>SKU</th>
            <th>Saldo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosFiltrados.map((p) => (
            <tr key={p._id}>
              <td>
                {p.imagem ? (
                  <img src={p.imagem} alt="Produto" width="50" />
                ) : (
                  "-"
                )}
              </td>
              <td>{p.descricao}</td>
              <td>{p.sku}</td>
              <td>{saldos[p._id] ?? "..."}</td>
              <td>
                <button
                  className="btn-gerenciar"
                  onClick={() => navigate(`/estoque/${p._id}`)}
                >
                  gerenciar estoque
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
