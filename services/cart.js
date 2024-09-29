const Cart = require('../models/cart');
const Product = require('../models/cart');

const createCart = async (clientEmail, cart_id) => {
    const cart = new Cart({
        Cart_id: cart_id,
        Size: 0,
        Products: null,
        TotalPrice: 0,
        Purchased_date: Date.UTC(0, 0, 0, 0, 0),
        ClientEmail: clientEmail,
        Purchased_valid: 0,
    });
    save_verify(cart)
    return cart;
};

const getCart = async (cart_id) => {
    const cart = await getCartById(cart_id);
    if (!cart)
        return null;
    return cart;
};

const deleteCart = async (cart_id) => {
    const cart = await getCartById(cart_id);
    if (!cart)
        return null;

    await remove_verify(cart);
    return cart;
};

const update_Purchased_date = async (cart_id) => {
    const cart = await getCartById(cart_id)
    if (!cart)
        return null;
    cart.Purchased_date = Date.now();
    save_verify(cart);
    return cart;
};

const getCartById = async (cart_id) => {
    return await Cart.findById(cart_id);
};

const addProduct = async (cart_id, product) => {
    const cart = await getCartById(cart_id)
    if (!cart)
        return null;

    await cart.Products.push(product).then(() => {
        console.log('Cart Product added successfully');
    })
        .catch((err) => {
            console.error('Error: ', err, ' adding Cart Product');
        });

    cart.Size = cart.Size + 1
    cart.TotalPrice = cart.TotalPrice + product.Price

    save_verify(cart);
    return cart;
};

const getProduct = async (cart_id, product) => {
    const cart = await getCartById(cart_id)
    if (!cart)
        return null;
    for (let i = 0; i < cart.Size; i++) {
        if (cart.Products[i].getProduct_Id() === product.getProduct_Id())
            return product;
    }
    return null;
};

const getAllProduct=async(cart_id)=>{
    return await Product.find({});;
}
const deleteProduct = async (cart_id, product) => {

    //option
    //const updatedArray = myArray.filter(obj => obj.id !== 2)//insert
    //const RemoveIndex = cart.Products.findIndex(obj => obj.Product_id === product.Product_id);//delete
    //if (RemoveIndex !== -1) {//delete
    //    cart.Products.splice(RemoveIndex, 1);//delete
    //}

    const cart = await getCartById(cart_id)
    if (!cart && cart.Size === 0)
        return null;

    const RemoveIndex = await cart.Products.findIndex(obj => obj.Product_id === product.Product_id);
    if (RemoveIndex === -1)
        console.error('Error: ', err, ' removing Cart Product');

    cart.Products.splice(RemoveIndex, 1);
    console.log('Cart Product removed successfully');

    //if (!cart && cart.Size === 0)
    //    return null;
    //
    //await cart.Products.remove(product).then(() => {
    //    console.log('Cart Product removed successfully');
    //})
    //    .catch((err) => {
    //        console.error('Error: ', err, ' removing Cart Product');
    //    });
    //

    cart.Size = cart.Size - 1
    cart.TotalPrice = cart.TotalPrice - product.Price

    save_verify(cart);
    return cart;
};

const save_verify = async (Cart) => {
    await Cart.save().then(() => {
        console.log('Cart added successfully');
    })
        .catch((err) => {
            console.error('Error: ', err, ' adding Cart');
        });
};

const remove_verify = async (Cart) => {
    await Cart.remove().then(() => {
        console.log('Cart removed successfully');
    })
        .catch((err) => {
            console.error('Error: ', err, ' removing Cart');
        });
};

const getCart_Id = async () => {
    return this.Cart_Id;
};

module.exports = {
    createCart,
    getCart_Id,
    getCart,
    getCartById,
    deleteCart,
    update_Purchased_date,
    addProduct,
    deleteProduct,
    getProduct,
    getAllProduct
};
