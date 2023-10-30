const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  try {
    const token = req.cookies.token;
    // if no token redirect to login page
    if (!token) return res.status(401).send("Access denied! No Token provided");
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
