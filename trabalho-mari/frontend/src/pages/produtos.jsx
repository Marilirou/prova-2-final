import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [saldos, setSaldos] = useState({});
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const carregarTudo = async () => {
      try {
        const res = await axios.get('http://localhost:3000/produtos');
        setProdutos(res.data);
        buscarSaldos(res.data);
      } catch (err) {
        console.error('Erro ao buscar produtos', err);
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
        lancs.forEach((l) => {
          if (l.tipo === 'entrada') saldo += l.quantidade;
          else if (l.tipo === 'saida') saldo -= l.quantidade;
          else if (l.tipo === 'balanco') saldo = l.quantidade;
        });

        novosSaldos[p.id] = saldo;
      } catch (err) {
        console.error('Erro ao buscar lançamentos do produto', p.id, err);
        novosSaldos[p.id] = 0;
      }
    }

    setSaldos(novosSaldos);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja excluir este item?')) return;
    await axios.delete(`http://localhost:3000/produtos/${id}`);
    const res = await axios.get('http://localhost:3000/produtos');
    setProdutos(res.data);
    buscarSaldos(res.data);
  };

  const produtosFiltrados = produtos.filter((p) =>
    p.sku?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ display: 'inline-block' }}>Produtos</h2>

      <button className="botao-azul" onClick={() => navigate('/novo-produto')}>
        incluir produto
      </button>

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

      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <strong>todos</strong>{' '}
        {String(produtosFiltrados.length).padStart(2, '0')}
      </div>

      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Descrição</th>
            <th>SKU</th>
            <th>Preço</th>
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
                    style={{ width: '150px', borderRadius: '8px' }}
                  />
                ) : (
                  '-'
                )}
              </td>
              <td>{p.descricao}</td>
              <td>{p.sku}</td>
              <td>R$ {parseFloat(p.preco).toFixed(2)}</td>
              <td>{saldos[p.id] ?? '...'}</td>
              <td>
                <button
                  title="Editar"
                  onClick={() => navigate(`/editar-produto/${p.id}`)}
                  style={{ fontSize: '30px' }}
                >
                  ✏️
                </button>
                <button
                  title="Excluir"
                  onClick={() => handleExcluir(p.id)}
                  style={{ fontSize: '30px' }}
                >
                  🗑️
                </button>
                <button
                  title="Detalhes"
                  onClick={() => navigate(`/produto/${p.id}`)}
                  style={{ fontSize: '30px' }}
                >
                  🔍
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
