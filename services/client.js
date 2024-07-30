const Cart = require('../models/cart');
const Client = require('../models/client');
const Pass = require('../models/password');
//const Cart_Service = require('../services/cart');

const createClient = async (name, last_name, img_src ,deploy, email, password) => {
    const client = new Client({
        Name: name,
        Last_name: last_name,
        img_src: img_src,
        Deploy_Address: deploy,
        Carts_num: 0,
        Carts: null,
        Phone: 0,
        Email: email,
        Address: "",
    });

    const pass = new Pass({
        Email: ClientEmail,
        Password: password,
    });
    await Pass.createPassword(pass);
    save_verify(client);
    return client;
};

const changePassword = async (email, password) => {
    const pass = await getPassById(email);
    if (!pass)
        return null;
    return await pass.updatePassword(email, password);
};

const getClient = async (email) => {
    const client = await getClientById(email);
    if (!client)
        return null;
    return client;
};

const deleteClient = async (email) => {
    const client = await getClientById(email);
    if (!client)
        return null;
    for (let i = 0; i < client.Carts_num; i++) {
        const cart_id = client.Carts[i].Cart_id;
        const cart = await getCartById(cart_id);
        if (!cart || !cart_id)
            return null;
            if(!cart.Purchased_valid)//save Purchased cart for financial 
        await cart.deleteCart(cart_id);
    }
    const pass = await getPassById(email);
    if (!pass)
        return null;
    await Pass.deletePassword(pass);
    remove_verify(client);
    return client;

};

//const updateClient= async (name,last_name,deploy,carts_num,carts,phone,email,address,password) => {
const updateClient = async (name, last_name, deploy, phone, email, address, password) => {
    const client = await getClientById(email);
    if (!client)
        return null;
        const pass = await getPassById(email);
        if (!pass)
            return null;
    client.Name = name;
    client.Last_name = last_name;
    client.Deploy_Address = deploy;
    //client.Carts_num=carts_num;///the carts sty same
    // client.Carts =carts;
    client.Phone = phone;
    client.Email = email;
    client.Address = address;

    await pass.updatePassword(email, password);
    update_verify(client);
    return client;
};

const getCart = async (cart_id) => {
    const cart = await getCartById(cart_id);
    if (!cart)
    return null;
    return cart;
};

const addCart = async (cart) => {
    cart.addCart(cart);
    return this;
};

const deleteCart = async (Cart_id) => {
    const cart = await getCartById(Cart_id);
    if (!cart)
        return null;
    cart.deleteCart();
};

const getAllCarts = async (email) => {
    const client = await getClientById(email);
    if (!client)
        return null;
    return client.Carts;
};

const save_verify = async (client) => {
    await client.save().then(() => {
        console.log('Client added successfully');
    })
        .catch((err) => {
            console.error('Error:', err, 'adding Client:');
        });
};

const remove_verify = async (client) => {
    await client.remove().then(() => {
        console.log('Client remove successfully');
    })
        .catch((err) => {
            console.error('Error:', err, 'removing Client');
        });
};

const update_verify = async (client) => {
    await client.remove().then(() => {
        console.log('Client update successfully');
    })
        .catch((err) => {
            console.error('Error:', err, 'updating Client');
        });
};

const getClientById = async (email) => {
    return await Client.findById(email);
};

const getClient_Id = async () => {
    return this.Email;
};

module.exports = {
    createClient,
    getClient,
    getClientById,
    getClient_Id,
    deleteClient,
    updateClient,
    changePassword,
    getCart,
    addCart,
    deleteCart,
    getAllCarts,//for history
};