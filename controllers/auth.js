const register = async (req, res) => {
  res.json(req.body);
};
const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
