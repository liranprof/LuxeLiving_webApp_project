const Supplier_Service = require('../services/supplier');

const createSupplier = async (req, res) => {
    const newSupplier = await Supplier_Service.createSupplier(
      req.body.Supplier_ID , 
      req.body.Name,
        req.body.Products,
        req.body.Address,
        req.body.Phone,
        req.body.Products_mount,
    );
    res.json(newSupplier);
};

const getSupplier = async (req, res) => {
    const Supplier = await Supplier_Service.getSupplierById(req.params.id);
    if (!Supplier) {
        return res.status(404).json({ errors: ['Supplier not found'] });
    }

    res.json(Supplier);
};

const getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier_Service.getAllProduct();
  if (!suppliers) {
    return res.status(404).json({ errors: ['Products not found'] });
  }

  res.json(suppliers);
};
const updateSupplier = async (req, res) => {
  const Supplier = await Supplier_Service.updateSupplier(
    req.body.Supplier_ID , 
    req.body.Name,
      req.body.Products,
      req.body.Address,
      req.body.Phone,
      req.body.Products_mount,
  );
  res.json(Supplier);
};

const deleteSupplier = async (req, res) => {
  const Supplier = await Supplier_Service.deleteSupplier(req.params.id);
  if (!Supplier) {
    return res.status(404).json({ errors: ['Supplier not found'] });
  }

  res.send();
};

module.exports = {
  createSupplier,
  getSupplier,
  getAllSuppliers,
  deleteSupplier,
  updateSupplier
};