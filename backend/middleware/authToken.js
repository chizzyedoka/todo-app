const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).send("Access denied! No Token provided");
    console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded) return res.status(400).send("Invalid token");
      req.user = decoded;
      next();
    } catch (ex) {
      console.log(ex);
      return res.status(401).send("Invalid token");
    }
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("server error");
  }
}

module.exports = authenticateToken;
