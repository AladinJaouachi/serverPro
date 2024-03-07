import Jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ msg: "no token provided" });
  }
  Jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send({ msg: "failed authenyificate token " });
    }
    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;
