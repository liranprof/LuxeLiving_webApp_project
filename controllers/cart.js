const Cart_Service = require('../services/cart');

//The req.params.id part extracts the value of the id parameter from the URL.
const createCart = async (req, res) => {
    const newCart = await Cart_Service.createCart(  
      req.body.ClientEmail,
      req.body.Cart_id,
    );
    res.json(newCart);
};
 
const getCart = async (req, res) => {
    const cart = await Cart_Service.getCart(req.body.Cart_id);
    if (!cart) {
        return res.status(404).json({ errors: ['Cart not found'] });
    }
    res.json(cart);
};
const getAllProduct = async (req, res) => {
  const products = await Cart_Service.getAllProduct();
  if (!products) {
    return res.status(404).json({ errors: ['Products not found'] });
  }

  res.json(products);
};
const update_Purchased_date = async (req,res) => {
  const cart = await Cart_Service.update_Purchased_date(req.body.Cart_id)
  res.json(!req.body.Cart_id)
  {res.status(400).json({message: " Cart_id is required"});}; 
};

const addProduct = async (req,res) => {
  const cart = await Cart_Service.addProduct( 
    req.body.Cart_id,
    req.body.Product,
  )
  res.json(cart);
};

const getProduct = async (req,res) => {
  const cart = await Cart_Service.getProduct( 
    req.body.Cart_id,
    req.body.Product,
  )
  res.json(cart);
};

const deleteProduct = async (req,res) => {
  const cart = await Cart_Service.deleteProduct(
    req.body.Cart_id,
    req.body.product,
  )
  res.json(cart);
};

const deleteCart = async (req, res) => {
  const cart = await Cart_Service.deleteCart(req.body.Cart_id);
  if (!cart) {
    return res.status(404).json({ errors: ['Cart not found'] });
  }
  res.send();
};

module.exports = {
  createCart,
  getCart,
  deleteCart,
  update_Purchased_date,
  addProduct,
  deleteProduct,
  getProduct,
  getAllProduct
};