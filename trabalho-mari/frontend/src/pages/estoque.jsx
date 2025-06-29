import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Estoque() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [saldos, setSaldos] = useState({});

  useEffect(() => {
    const carregarTudo = async () => {
      try {
        const res = await axios.get('http://localhost:3000/produtos');
        setProdutos(res.data);
        buscarSaldos(res.data);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
      }
    };

    carregarTudo();
  }, []);

  const buscarSaldos = async (produtos) => {
    const novosSaldos = {};

    for (const p of produtos) {
      try {
        const res = await axios.get(
          `http://localhost:3000/lancamentos/${p.id}`
        );
        const lancs = res.data;

        let saldo = 0;
        let encontrouBalanco = false;

        for (const l of lancs) {
          if (l.tipo === 'balanco') {
            saldo = l.quantidade;
            encontrouBalanco = true;
          } else if (!encontrouBalanco) {
            if (l.tipo === 'entrada') saldo += l.quantidade;
            else if (l.tipo === 'saida') saldo -= l.quantidade;
          }
        }

        novosSaldos[p.id] = saldo;
      } catch (err) {
        console.error('Erro ao buscar lançamentos do produto', p.id, err);
        novosSaldos[p.id] = 0;
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
            <tr key={p.id}>
              <td>
                {p.imagem ? (
                  <img
                    src={p.imagem}
                    alt="Produto"
                    style={{ width: '100px', borderRadius: '8px' }}
                  />
                ) : (
                  '-'
                )}
              </td>
              <td>{p.descricao}</td>
              <td>{p.sku}</td>
              <td>{saldos[p.id] ?? '...'}</td>
              <td>
                <button
                  className="btn-gerenciar"
                  onClick={() => navigate(`/estoque/${p.id}`)}
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
