import '../styles/modal.css';

export default function ModalLancamento({
  aberto,
  fechar,
  onSalvar,
  form,
  setForm
}) {
  if (!aberto) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar();
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-topo">
          <h3>Lançamento de estoque</h3>
          <span className="fechar" onClick={fechar}>
            fechar ✖
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-linha">
            <div>
              <label>Tipo</label>
              <select name="tipo" value={form.tipo} onChange={handleChange}>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
                <option value="balanco">Balanço</option>
              </select>
            </div>
            <div>
              <label>Data</label>
              <input
                type="date"
                name="data"
                value={form.data}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Hora</label>
              <input
                type="time"
                name="hora"
                value={form.hora}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-linha">
            <div style={{ flex: 1 }}>
              <label>Quantidade</label>
              <input
                type="number"
                name="quantidade"
                value={form.quantidade}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Observações</label>
          <textarea
            name="observacao"
            value={form.observacao}
            onChange={handleChange}
          ></textarea>

          <div className="botoes-modal">
            <button type="submit" className="botao-azul">
              salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
