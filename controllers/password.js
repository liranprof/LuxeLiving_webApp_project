const Password_Service = require('../services/password');

const createPassword = async (req, res) => {
    const newPassword = await Password_Service.createPassword(
        req.body.Password,
        req.body.Email
    );
    res.json(newPassword);
};

const updatePassword = async (req,res) => {
  const Password = await Password_Service.updatePassword(
    req.body.Password,
    req.body.Email
  )
  res.send();
};

const deletePassword = async (req, res) => {
  const product = await productService.deletePassword(req.params.id);
  if (!product) {
    return res.status(404).json({ errors: ['Email not found'] });
  }

  res.send();
};

module.exports = {
  createPassword,
  updatePassword,
  deletePassword
};