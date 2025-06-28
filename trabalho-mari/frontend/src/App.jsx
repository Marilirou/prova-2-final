import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Produtos from './pages/produtos';
import Estoque from './pages/estoque';
import NovoProduto from './pages/novoproduto';
import DetalhesProduto from './pages/detalhesproduto';
import EditarProduto from './pages/editarproduto';
import GerenciarEstoque from './pages/gerenciarestoque';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [aba, setAba] = useState("produtos");

  return (
    <div className="layout">
      <Navbar aba={aba} setAba={setAba} />
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Produtos /></PrivateRoute>} />
          <Route path="/estoque" element={<PrivateRoute><Estoque /></PrivateRoute>} />
          <Route path="/novo-produto" element={<PrivateRoute><NovoProduto /></PrivateRoute>} />
          <Route path="/produto/:id" element={<PrivateRoute><DetalhesProduto /></PrivateRoute>} />
          <Route path="/editar-produto/:id" element={<PrivateRoute><EditarProduto /></PrivateRoute>} />
          <Route path="/estoque/:id" element={<PrivateRoute><GerenciarEstoque /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
