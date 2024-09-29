//app.js=>Views(render)=>routes=>controllers=>services=>models
//app.js Request --> Routes -> Controllers -> Services -> Models -> Database
//app.js Response <-- Views <- Routes <- Controllers <- Services <- Models <- Database

//require() function to import modules (files) into your application.
const express = require('express');//search HELP
const bodyParser = require('body-parser');
//Body-parser to handle incoming HTTP request bodies(payloads) for express. 
//payloads that arrive when someone submits a form, sends an API request, or uploads a file.

const cors = require('cors');//use when crossing domain boundaries
/*(Cross-Origin Resource Sharing)  
It ensures that clients can mingle and share resources (like images, scripts, or APIs) 
without causing any faults.//Express middleware
CORS defines rules for sharing resources across origins(like permission)
CORS communicates through HTTP header When a browser makes a cross-origin request, 
the server responds with specific headers that allow or deny access.*/
//const path = require('path');// for path.join take tow path and join them

const mongoose = require('mongoose');//ODM (Object Data Modeling)
//uses Promises frequent//needs npm install mongoose
const cart = require('./routes/cart.js');
const client = require('./routes/client.js');
const password = require('./routes/password.js');
const product = require('./routes/product.js');
const supplier = require('./routes/supplier.js');
const about = require('./routes/about.js');

const net = require('net');//for Handle SIGINT (Ctrl+C)

require('dotenv').config({ path: 'config/.env' }); // Loads variables from .env
const dbUrl = process.env.CONNECTION_STRING;
const dbPort = process.env.DB_PORT;
const app_port = process.env.PORT;
const api=process.env.Google_Map_API_KEY;
/*dotenv(Node.js package)—for managing environment variables in app 
simplifies the process of loading separate & external environment variables from .env
to configure our apps differently based on Environment Variables like
NODE_ENV='development'(e.g., development, production, testing).*/


mongoose.connect(dbUrl)
  .then(function () { console.info('mongoose connected Successfully to: ', dbUrl); })
  .catch(function (err) { console.error('mongoose connected err: ', err); });

mongoose.Promise = global.Promise
/*sets the Promise library (based on the .mpromise library) 
//to the global native JavaScript Promise implementation.
//Mongoose use the same Promises that are available in native modern JavaScript environments (such as Node.js)
// Connect to the DB an initialize the app if successful
//module<-Node.js module server*/

var app = express();//express module<-Node.js module server

// Set EJS as the view engine
app.set('view engine', 'ejs');
//This line configures Express to use EJS as the template engine
// for rendering views.

app.use(express.static('public'));
/*point for static assets (images, CSS files, JavaScript files, and more even subdirectores)
in an Express app
//multiple static asset directories (like public and files),
 Express looks them up in the order of the code lines.*/
app.use(cors());//// Enable CORS for all routes

app.use(express.json());// For JSON bodies
//After the parsing, it places the parsed data into the req.body property.  
//When handling a request, use parsed req.body.

app.use(bodyParser.urlencoded({// Parse URL-encoded data// For URL-encoded forms

  extended: false,
  //false option indicates that the parser should use the classic query string library
  //(Node.js’s built-in querystring module) to parse the data

  limit: "120mb",//payload_limit-option sets the maximum size for the request body 
}));

//define routes for GET
app.use('/cart', cart);
app.use('/client', client);
app.use('/password', password);
app.use('/product', product);
app.use('/supplier', supplier);
app.use('/about', about);


// Define a test route/////only for tests//////
//app.get('/', (req, res) => {////need to disable all same routes
//res.send('GET is responding');
//console.log('GET is working properly!');
//});
// Define a POST route to test JSON handling////only for tests///////
//  app.post('/', (req, res) => {
//    //console.log('Received POST data:', req.body); // Log the received body to the console
//    res.json({ message: 'Received your data!', data: 'DATA' });
//  });


// routes handlers
app.get('/', product);///load main page
app.get('/about', about);///load main page
//browser sends a GET request to the path /, this handler 
// Express.js route handler for the GET HTTP method

//main 
// FIXME:error
/*const ProductController = require('./controllers/product.js');
app.get('/about', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('about', { Products_Types: types , Products: products });
  //res.render('view_for_render', {passes_data});
//The res.render() method combines the EJS template with 
//the provided data and sends the resulting HTML to the client.
//render view_for_render know path by the app.set()
} catch (err) {
  res.status(500).send(err);
}});*/
// TODO:check under ToDo
//////////// user
/*
app.get('/modify_carts', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('user', { Products_Types: types , Products: products });

} catch (err) {
  res.status(500).send(err);
}});

app.get('/user_details', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('user_detail', { Products_Types: types , Products: products });
} catch (err) {
  res.status(500).send(err);
}});


/////////////// admin
app.get('/modify_products', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('admin_page', { Products_Types: types , Products: products });
} catch (err) {
  res.status(500).send(err);
}});

app.get('/admin_modify_carts', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('admin_page', { Products_Types: types , Products: products });
} catch (err) {
  res.status(500).send(err);
}});

app.get('/modify_clients', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('admin_page', { Products_Types: types , Products: products });
} catch (err) {
  res.status(500).send(err);
}});

app.get('/modify_suppliers', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('admin_page', { Products_Types: types , Products: products });
} catch (err) {
  res.status(500).send(err);
}});

app.get('/modify_store_location', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('admin_page', { Products_Types: types , Products: products });
} catch (err) {
  res.status(500).send(err);
}});

app.get('/financial', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('financial', { Products_Types: types , Products: products });
} catch (err) {
  res.status(500).send(err);
}});

app.get('/facebook', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('facebook', { Products_Types: types , Products: products });
} catch (err) {
  res.status(500).send(err);
}});

app.get('/admin_details', (req, res) => {  try {
  const products = await Product_Service.getAllProduct();
  const types = await Product_Service.getProductsType();
  res.render('about', { Products_Types: types , Products: products });
} catch (err) {
  res.status(500).send(err);
}});
*/

//handling func
const startServer = (port, app_server) => {
  return new Promise((resolve, reject) => {//Promise - a-syn opr that can either 
    //be resolved (successful completion) 
    //or rejected (failure).
    const server = app.listen(port, app_server, (err) => {//()=>{}callback func
      //app.listen -  //method that binds and listens for,
      // connections on the specified host and port.
      //is called to start the Express server.
    
       if (err) {
       return reject(err);
     }
       //const { runTests } = require('./app_com_tests');//////////////for test only//////
       //runTests('127.0.0.1',app_port);//////////////for test only//////

       resolve(server);//the Promise is resolved with the server instance
     });
   });
 };

 startServer(app_port, '127.0.0.1')
   .then((server) => {//Handling the returned promise - promised_func().then().catch
     console.log(`Server is running on port ${app_port}`);
   })
   .catch((err) => {
     console.error('Error starting server:', err);
   });

// Handle SIGINT (Ctrl+C) signal to shut down the server gracefully
app = net.createServer();
process.on('SIGINT', () => {
  console.log('App_Server shutting down gracefully...');
  app.close(() => {
    console.log('App_Server closed.');
    process.exit(0);
  });
});

