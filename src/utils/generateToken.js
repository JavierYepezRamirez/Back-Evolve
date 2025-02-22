const jwt = require("jsonwebtoken");

const generateToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = generateToken;