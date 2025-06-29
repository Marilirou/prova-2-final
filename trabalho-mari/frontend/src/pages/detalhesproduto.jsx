import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState(null);
  const [lancamentos, setLancamentos] = useState([]);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    buscarProduto();
    buscarLancamentos();
  }, [id]);

  const buscarProduto = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/produtos/${id}`);
      setProduto(res.data);
    } catch (err) {
      console.error('Erro ao carregar produto', err);
    }
  };

  const buscarLancamentos = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/lancamentos/${id}`);
      const dados = res.data;

      let novoSaldo = 0;
      dados.forEach((l) => {
        if (l.tipo === 'entrada') novoSaldo += l.quantidade;
        else if (l.tipo === 'saida') novoSaldo -= l.quantidade;
        else if (l.tipo === 'balanco') novoSaldo = l.quantidade;
      });

      setLancamentos(dados);
      setSaldo(novoSaldo);
    } catch (err) {
      console.error('Erro ao carregar lançamentos', err);
    }
  };

  if (!produto) return <p>Carregando detalhes...</p>;

  return (
    <div>
      <button className="btn-voltar" onClick={() => navigate('/')}>
        🔙 voltar
      </button>
      <h2>Detalhes do produto</h2>

      <div
        style={{
          marginTop: '20px',
          background: '#f8f8f8',
          padding: '20px',
          borderRadius: '8px'
        }}
      >
        {produto.imagem && (
          <img
            src={produto.imagem}
            alt="Produto"
            style={{
              maxWidth: '200px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          />
        )}

        <p>
          <strong>Descrição:</strong> {produto.descricao}
        </p>
        <p>
          <strong>SKU:</strong> {produto.sku}
        </p>
        <p>
          <strong>Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}
        </p>
        <p>
          <strong>Saldo:</strong> {saldo}
        </p>
        <p>
          <strong>Descrição complementar:</strong>
          <br />
          {produto.descricao_complementar || '–'}
        </p>
      </div>
    </div>
  );
}
