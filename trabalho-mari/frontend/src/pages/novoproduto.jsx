import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NovoProduto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descricao: '',
    sku: '',
    imagem: '',
    descricao_complementar: '',
    preco: '',
    saldo: ''
  });

  const [erros, setErros] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const novosErros = {};
    if (!formData.descricao) novosErros.descricao = 'Descrição obrigatória';
    if (!formData.sku) novosErros.sku = 'SKU obrigatório';
    if (!formData.preco || parseFloat(formData.preco) <= 0)
      novosErros.preco = 'Preço inválido';
    if (!formData.saldo || parseInt(formData.saldo) < 0)
      novosErros.saldo = 'Saldo inválido';
    return novosErros;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validacao = validar();
    if (Object.keys(validacao).length > 0) {
      setErros(validacao);
      return;
    }

    try {
      const resposta = await axios.get('http://localhost:3000/produtos');
      const skuExiste = resposta.data.some((p) => p.sku === formData.sku);

      if (skuExiste) {
        setErros((prev) => ({ ...prev, sku: 'SKU já cadastrado' }));
        return;
      }
    } catch (err) {
      console.error('Erro ao verificar SKU:', err);
      alert('Erro ao verificar SKU duplicado.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/produtos', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('✅ Produto cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('❌ Erro ao cadastrar produto:', error);
      alert('❌ Erro ao salvar produto. Veja o console.');
    }
  };

  return (
    <div>
      <button className="btn-voltar" onClick={() => navigate('/')}>
        🔙 voltar
      </button>
      <h2 style={{ marginLeft: '10px' }}>Novo produto</h2>
      <p className="subtitulo">dados gerais</p>

      <form onSubmit={handleSubmit}>
        <label>Descrição</label>
        <input
          name="descricao"
          value={formData.descricao}
          onChange={handleInput}
          className={erros.descricao ? 'erro-campo' : ''}
        />
        {erros.descricao && <p className="erro">{erros.descricao}</p>}

        <div className="form-linha">
          <div>
            <label>Código (SKU)</label>
            <input
              name="sku"
              value={formData.sku}
              onChange={handleInput}
              className={erros.sku ? 'erro-campo' : ''}
            />
            {erros.sku && <p className="erro">{erros.sku}</p>}
          </div>
          <div>
            <label>Preço de venda</label>
            <input
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleInput}
              className={erros.preco ? 'erro-campo' : ''}
            />
            {erros.preco && <p className="erro">{erros.preco}</p>}
          </div>
          <div>
            <label>Estoque inicial</label>
            <input
              type="number"
              name="saldo"
              value={formData.saldo}
              onChange={handleInput}
              className={erros.saldo ? 'erro-campo' : ''}
            />
            {erros.saldo && <p className="erro">{erros.saldo}</p>}
          </div>
          <div>
            <label style={{ visibility: 'hidden' }}>un</label>
            <div className="unidade">un</div>
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
          <div style={{ marginTop: '10px' }}>
            <img
              src={formData.imagem}
              alt="Pré-visualização"
              style={{
                maxWidth: '150px',
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        )}

        <button type="submit">salvar</button>
      </form>
    </div>
  );
}
