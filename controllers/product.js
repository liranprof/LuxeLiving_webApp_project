const Product_Service = require('../services/product');

const createProduct = async (req, res) => {
  const newProduct = await Product_Service.createProduct(
    req.body.Product_id,
    req.body.Name,
    req.body.Type,
    req.body.Brand,
    req.body.Suppliers,
    req.body.Suppliers_amount,
    req.body.Price,
    req.body.Description,
    req.body.Discount,
    req.body.Rank
  );
  res.json(newProduct);
};

const getProduct = async (req, res) => {
  const product = await Product_Service.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ errors: ['Product not found'] });
  }

  res.json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product_Service.updateProduct(
    req.body.Product_id,
    req.body.Name,
    req.body.Type,
    req.body.Brand,
    req.body.Suppliers,
    req.body.Suppliers_amount,
    req.body.Price,
    req.body.Description,
    req.body.Discount,
    req.body.Rank
  );
  if (!product) {
    return res.status(404).json({ errors: ['Product not found'] });
  }

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product_Service.deleteProduct(req.params.id);
  if (!product) {
    return res.status(404).json({ errors: ['Product not found'] });
  }

  res.send();
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
