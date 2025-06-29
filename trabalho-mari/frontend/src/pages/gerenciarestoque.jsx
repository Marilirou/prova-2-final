import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ModalLancamento from '../components/ModalLancamento';

export default function GerenciarEstoque() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState(null);
  const [lancamentos, setLancamentos] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [form, setForm] = useState({
    tipo: 'Entrada',
    data: new Date().toISOString().slice(0, 10),
    hora: new Date().toLocaleTimeString('pt-BR').slice(0, 5),
    quantidade: '',
    observacao: ''
  });

  useEffect(() => {
    buscarProduto();
    buscarLancamentos();
  }, [id]);

  const buscarProduto = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/produtos/${id}`);
      setProduto(res.data);
    } catch (err) {
      console.error('Erro ao buscar produto', err);
    }
  };

  const buscarLancamentos = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/lancamentos/${id}`);
      const dados = res.data;

      let novoSaldo = 0;
      let encontrouBalanco = false;

      for (let i = 0; i < dados.length; i++) {
        const l = dados[i];

        if (l.tipo === 'balanco') {
          novoSaldo = l.quantidade;
          encontrouBalanco = true;
        } else if (l.tipo === 'entrada') {
          novoSaldo += l.quantidade;
        } else if (l.tipo === 'saida') {
          novoSaldo -= l.quantidade;
        }
      }

      setLancamentos(dados);
      setSaldo(novoSaldo);
    } catch (err) {
      console.error('Erro ao buscar lançamentos', err);
    }
  };

  const salvarLancamento = async () => {
    try {
      console.log('Dados enviados:', form);
      await axios.post('http://localhost:3000/lancamentos', {
        produtoId: id,
        tipo: form.tipo
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase(),
        quantidade: Number(form.quantidade),
        observacao: form.observacao,
        data: new Date(`${form.data}T${form.hora}`)
      });

      alert('✅ Lançamento salvo!');
      setMostrarModal(false);
      setForm({
        tipo: 'Entrada',
        data: new Date().toISOString().slice(0, 10),
        hora: new Date().toLocaleTimeString('pt-BR').slice(0, 5),
        quantidade: '',
        observacao: ''
      });
      buscarLancamentos();
    } catch (err) {
      alert('❌ Erro ao salvar lançamento.');
    }
  };

  if (!produto) return <p>Carregando produto...</p>;

  return (
    <div>
      <button className="btn-voltar" onClick={() => navigate('/estoque')}>
        🔙 voltar
      </button>
      <h2 style={{ marginBottom: 0 }}>{produto.descricao}</h2>
      <p style={{ marginTop: 0, fontWeight: '300' }}>{produto.sku}</p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px'
        }}
      >
        <div>
          <p style={{ fontWeight: 'bold' }}>
            saldo físico <span>{saldo}</span>
          </p>
        </div>
        <button className="botao-azul" onClick={() => setMostrarModal(true)}>
          incluir lançamento
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Data e hora</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody>
          {lancamentos.map((l) => (
            <tr key={l.id}>
              <td>
                {new Date(l.data).toLocaleDateString()} -{' '}
                {new Date(l.data).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td>{l.tipo}</td>
              <td>{l.quantidade}</td>
              <td>{l.observacao || '–'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalLancamento
        aberto={mostrarModal}
        fechar={() => setMostrarModal(false)}
        onSalvar={salvarLancamento}
        form={form}
        setForm={setForm}
      />
    </div>
  );
}
