import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Produtos from './pages/produtos';
import Estoque from './pages/estoque';
import NovoProduto from './pages/novoproduto';
import DetalhesProduto from "./pages/detalhesproduto";
import EditarProduto from "./pages/editarproduto";
import GerenciarEstoque from "./pages/gerenciarestoque";


function App() {
  const [aba, setAba] = useState("produtos");

  return (
    <div className="layout">
      <Navbar aba={aba} setAba={setAba} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Produtos />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/novo-produto" element={<NovoProduto />} />
          <Route path="/produto/:id" element={<DetalhesProduto />} />
          <Route path="/editar-produto/:id" element={<EditarProduto />} />
          <Route path="/estoque/:id" element={<GerenciarEstoque />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
