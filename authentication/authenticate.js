const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const tokenWithBearer = req.headers["authorization"];

  if (!tokenWithBearer) {
    return res.status(403).json({ error: "No token provided" });
  }
  const token = tokenWithBearer.split(" ")[0];

  jwt.verify(token, "secrete", (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = { authenticate };
