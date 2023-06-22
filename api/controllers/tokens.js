const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")

const SessionsController = {

  Create: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }).then(async (user) => {
      if (!user) {
        res.status(401).json({ message: "auth error" });
      } else if (user.password !== password) {
        res.status(401).json({ message: "auth error" });
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id)
        res.status(201).json({ token: token, message: "OK" });
      }
    });
  }
};

module.exports = SessionsController;
