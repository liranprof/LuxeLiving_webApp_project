const Product_Service = require('../services/product');

// Verify 
const verifyId = async (Product_id) => {
  if (typeof Product_id === 7 && Product_id.length > 0 && Product_id.length <= 24) 
      return true;
  else
      return false; 
}
const verifyName = async (Name) => {
  if (typeof Name === 'string' && Name.length <= 40)
      return true;
  else
      return false;
}

async function createProduct(req, res) {
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
  const productId = req.params.id;
  const verifyID = await verifyId(productId);
  if(verifyID)
  {
    const product = await Product_Service.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: ['Product not found'] });
    }
    res.json(product);
  }
  else return;
};

const getProductByName = async (req,res) => {
  const productName = req.body.Name;
  const verifName = await verifyName(productName);
  if (verifName) {
    const product = await Product_Service.getProductByName(req.body.Name);
    if (!product) {
      return res.status(404).json({ errors: ['Product not found'] });
    }
    res.json(product);
  }
};

const getProductByNameParams = async (req,res) => {
  const productName = req.params.Name;
  const verifName = await verifyName(productName);
  if (verifName) {
    const product = await Product_Service.getProductByName(req.params.Name);
    if (!product) {
      return res.status(404).json({ errors: ['Product not found'] });
    }
    res.json(product);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product_Service.getAllProduct();
    const types = await Product_Service.getProductsType();
    res.render('welcome', { Products_Types: types , Products: products });
    //res.render('view_for_render', {passes_data});
  //The res.render() method combines the EJS template with 
  //the provided data and sends the resulting HTML to the client.
  //render view_for_render know path by the app.set()
  } catch (err) {
    res.status(500).send(err);
  }
};

const getProducts = async (req,res) => { // JSONs
  try {
    const products = await Product_Service.getAllProduct();
    res.json(products);
  } catch (err) {
    res.status(500).json({err});
  }
};

const getProductsByType = async (req,res) => { // JSONs
  try {
    const productType = req.body.Type;
    const products = await Product_Service.getProductsByType(req.body.Type);
    res.json(products);
  } catch (err) {
    res.status(500).json({err});
  }
};

const getProductsByTypeParams = async (req,res) => { // JSONs
  try {
    const productType = req.params.Type;
    const products = await Product_Service.getProductsByType(req.params.Type);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({err});
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const verifyID = await verifyId(productId);
  if(verifyID)
  {
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
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const verifyID = await verifyId(productId);
  if(verifyID)
  {
    const product = await Product_Service.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: ['Product not found'] });
    }
    res.send();
  }
};

module.exports = {
  verifyId,
  verifyName,
  createProduct,
  getProduct,
  getProductByName,
  getAllProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByType,
  getProductsByTypeParams,
  getProductByNameParams,
};
