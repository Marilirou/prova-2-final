# DecoArt - Sistema de Gerenciamento de Produtos e Estoque
Este projeto foi desenvolvido como parte da disciplina de Desenvolvimento de Aplicações Corporativas (Prova P2). 
Trata-se de um sistema para cadastro de produtos de decoração com controle de estoque. Para acessá-lo é necessário possuir usuário e senha.

**Frontend:**
- React + Vite
- React Router DOM
- Axios
- CSS customizado

**Backend:**
- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- JWT (Autenticação)
- Bcrypt (Hash de senhas)
- ESLint + Prettier

# Funções do sistema 
- Login com autenticação JWT
- Rota pública de login e rotas protegidas
- Cadastro, edição, visualização e exclusão de produtos
- Controle de lançamentos de estoque (entrada, saída, balanço)
- Visualização de histórico e saldo físico
- Validação de formulário na inclusão de produtos
- Navegação protegida via middleware e PrivateRoute

# Como Executar
# Pré-requisitos:
- Node.js
- MySQL https://dev.mysql.com/downloads/file/?id=541636
  (crie DATABASE trabalho_mari)

1. Baixe o arquivo trabalho-mari.zip
2. Abra no VS Code 
3. Abra o terminal e execute os comandos:
cd trabalho-mari (ou abra o terminal a partir da pasta)
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev

4. Na pasta frontend execute:
cd frontend (ou abra o terminal a partir da pasta)
npm install
npm run dev

Acesse em: [http://localhost:5173/login]

# Dados para Acesso
Email: admin@admin.com
Senha: 123456

# Estrutura de Pastas (Backend)
trabalho-mari/
├── config/
├── controllers/
├── middlewares/
├── migrations/
├── models/
├── routes/
├── seeders/
├── services/

# Requisitos da prova atendidos
- Login com autenticação JWT
- Entidade User
- Middleware protegendo rotas
- Sequelize com models, migrations e seeder
- Validação de formulário com lógica personalizada
- Separação em camadas (routes, controllers, services)
- ESLint e Prettier configurados com scripts `npm run lint` e `npm run format`
- Rota pública `/login` e privadas protegidas
- Repositório funcional para execução local

O projeto está estruturado para fácil manutenção e expansão. 
Toda a lógica foi separada conforme boas práticas de arquitetura em camada aprendidas na disciplina.
