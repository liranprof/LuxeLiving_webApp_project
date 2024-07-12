const Product = require('../models/product');

const createProduct = async (product_id, name, type, brand, supplier, price) => {

    const product = new Product({
        Product_id: product_id,
        Name: name,
        Type: type,
        Brand: brand,
        Suppliers: supplier,
        Price: price,
        Suppliers_amount: 1,
        Descriptions: null,
        Discount: 0,
        Rank: 0,
    });
    save_verify(product)
    return product;
};

const getProduct = async (product_id) => {
    return getProductById(product_id);
};

const updateProduct = async (product_id, name, type, brand, suppliers_amount, suppliers, price, description, discount, rank) => {
    const product = await getProductById(product_id);
    if (!product)
        return null;

    product.Name = name;
    product.Type = type;
    product.Brand = brand;
    product.Suppliers_amount = suppliers_amount;
    product.Suppliers = suppliers;
    product.Price = price;
    product.Description = description;
    product.Discount = discount;
    product.Rank = rank;

    save_verify(product);
    return product;
};

const deleteProduct = async (product_id) => {
    const product = await getProductById(product_id);
    if (!product)
        return null;

    remove_verify(product)
    return product;
};

const save_verify = async (Product) => {
    await Product.save().then(() => {
        console.log('Product added successfully');
    })
        .catch((err) => {
            console.error('Error', err, ' adding Product:');
        });
};

const remove_verify = async (Product) => {
    await Product.remove().then(() => {
        console.log('Product removed successfully');
    })
        .catch((err) => {
            console.error('Error', err, ' removing Product:');
        });
};

const getProductById = async (Product_id) => {
    return await Product.findById(Product_id);
};
const getProduct_Id = async () => {
   return this.Product_Id;
};
module.exports = {
    getProduct_Id,
    getProductById,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}
