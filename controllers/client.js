const Client_Service = require('../services/client');

const createClient = async (req, res) => {
  const newClient = await Client_Service.createClient(
    req.body.Name,
    req.body.Last_name,
    req.body.Deploy_Address,
    req.body.Email,
    req.body.Password,
  );
  res.json(newClient);
};

const getClient = async (req, res) => {
  const Client = await Client_Service.getClient(req.body.Email);
  if (!Client) {
    return res.status(404).json({ errors: ['Client not found'] });
  }
  res.send();
};

const updateClient = async (req, res) => {
  const Client = await Client_Service.updateClient(
    req.body.Name,
    req.body.Last_name,
    req.body.Deploy_Address,
    //req.body.Carts_num,
    //req.body.Carts,
    req.body.Phone,
    req.body.Email,
    req.body.Address,
    req.body.Password,
  );
  if (!Client) {
    return res.status(404).json({ errors: ['Client not found'] });
  }

  res.json(Client);
};

const deleteClient = async (req, res) => {
  const Client = await Client_Service.deleteClient(req.body.Email);
  if (!Client) {
    return res.status(404).json({ errors: ['Client not found'] });
  }
  res.json(Client);
};

const changePassword = async (req, res) => {
  const Client = await Client_Service.changePassword(
    req.body.Email,
    req.body.Password,
  );
};

const getCart = async (req, res) => {
  const cart = await Client_Service.getCart(req.body.Cart_id);
  res.json(cart);
};

const addCart = async (req, res) => {
  const cart = await Client_Service.addCart(req.body.Cart);
  res.json(cart);
};

const deleteCart = async (req, res) => {
  const cart = await Client_Service.deleteCart(req.body.Cart_id);
  res.json(cart);
};

const getAllCarts = async (req, res) => {
  const carts = await Client_Service.getAllCarts(req.body.Email);
  res.json(carts);
};

module.exports = {
  createClient,
  getClient,
  deleteClient,
  updateClient,
  changePassword,
  getCart,
  addCart,
  deleteCart,
  getAllCarts,//for history
};
