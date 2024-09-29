const Supplier = require('../models/supplier');
const Product = require('../models/product');

const createSupplier = async (supplier_ID,name) => {
    const supplier = new Supplier({
        Supplier_ID: supplier_ID,
        Name: name,
        img_src:"",
        Products_mount: 0,
        Products: null,
        Address: 0,
        Phone: 0,
    });
    save_verify(supplier);
    return supplier;
};

const getSupplier = async (supplier_ID) => {
    const supplier = await getSupplierById(supplier_ID);
    if (!supplier)
        return null;
    return supplier;
};

const getAllSuppliers=async()=>{
    return await Supplier.find({});;
}
const deleteSupplier = async (supplier_ID) => {
    const supplier = await getSupplierById(supplier_ID);
    if (!supplier)
        return null;
    remove_verify(supplier)
};

const updateSupplier = async (supplier_ID, name, products, products_mount, address, phone) => {
    const supplier = await getSupplierById(supplier_ID);
    if (!supplier)
        return null;
    supplier.Name = name;
    supplier.Supplier_ID = supplier_ID;
    supplier.Products_mount = products_mount;
    supplier.Products = products;
    supplier.Address = address;
    supplier.Phone = phone;
    save_verify(supplier);
};

const deleteProducts = async (supplier_ID, products, products_mount) => {
    const supplier = await getSupplierById(supplier_ID)
    if (!supplier)
        return null

    if (products_mount > supplier.products_num)
        supplier.Products = null;
    else {
        for (let i = 0; i < products_mount; i++) {
            const product = await getProductById(products[i]);
            if (!product)
                return null;

                await supplier.Products.remove(products[i]);
            
                //check if this last supplier on product in supplier list
            if (product.Suppliers_amount = 1)
                if (product.Suppliers[0] = supplier)

                    await Product.deleteProduct(product);
        }
    }
    supplier.Products_mount = supplier.Products_mount - products_mount
    save_verify(supplier);
    return supplier;
};

const addProducts = async (supplier_ID, products, products_mount) => {
    const supplier = await getSupplierById(supplier_ID)
    if (!supplier)
        return null

    for (let i = 0; i < products_mount; i++) {
        await supplier.Products.append(products[i]);
        //check if product already exist 
        const product = await getProductById(products[i].Product_id);
        if (!product) {
            await Product.addProduct(products[i])
        }
        supplier.Products_mount = supplier.Products_mount + products_mount
        save_verify(supplier);
        return supplier;
    }
};

const save_verify = async (Supplier) => {
    await Supplier.save().then(() => {
        console.log('Supplier added successfully');
    })
        .catch((err) => {
            console.error('Error adding Supplier:', err);
        });
};

const remove_verify = async (Supplier) => {
    await Supplier.remove().then(() => {
        console.log('Supplier removed successfully');
    })
        .catch((err) => {
            console.error('Error removing Supplier:', err);
        });
};

const getSupplierById = async (supplier_ID) => {
    return await Supplier.findById(supplier_ID);
};

module.exports = {
    createSupplier,
    getSupplier,
    getAllSuppliers,
    getSupplierById,
    deleteSupplier,
    updateSupplier,
    addProducts,
    deleteProducts,
};