const jwt = require("jsonwebtoken");

const JWT_SECRET = "segredo-super-seguro"; // ideal colocar em .env depois

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.usuario = user;
    next();
  });
}

module.exports = autenticarToken;
