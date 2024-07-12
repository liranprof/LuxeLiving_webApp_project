//require() function to import modules (files) into your application.

const bodyParser = require("body-parser");//Node.js module//middleware//parses body HTTP request//needs npm install -g body-parser
const express = require('express');//Node.js module server//needs npm install -g express

const mongoose_S = require('mongoose');//ODM (Object Data Modeling)//uses Promises extensively(תדיר)//needs npm install mongoose
const mongoose_P = require("mongoose");
//const path = require( "path" );//Node.js module//utilities for working with file and directory paths
//const routes = require('../routes/cart');//"files_location"//The routes module likely contains route handlers or other logic related to handling specific routes in your Express.js application.
const compression = require("compression");//uses gzip or deflate compression algorithms good response time to client//npm install compression
const pass = require('../config/pass');
const store = require('../config/store');
const app = require('../app');
const payload_limit = "20mb";
//node Express.js to run server???????

const mongoose_S_Options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  autoReconnect: true
};
const mongoose_P_Options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  autoReconnect: true
};
mongoose_S.Promise = global.Promise;
mongoose_P.Promise = global.Promise;//sets the Promise library (based on the .mpromise library) 
//to the global native JavaScript Promise implementation.
//Mongoose use the same Promises that are available in native modern JavaScript environments (such as Node.js)
// Connect to the DB an initialize the app if successful


const Store_DB_Connect = async () => {
  mongoose_S.connect(store.dbUrl, mongoose_S_Options)
  .then(() => {//a_syn cmd
        console.info('Database(store) connection successful to port: ', store.port);
        
        // Create express instance to setup API
        const ExpressLoader = require("./loaders/Express");
        new ExpressLoader();
      })
      .catch(err => {
        console.error('Error: ', err, 'Database(store) connect');
        return 0;
      });
      return 1;
    };
    const Pass_DB_Connect = async () => {
      mongoose_P.connect(pass.dbUrl, mongoose_P_Options)
      .then(() => {//a_syn cmd
        console.info('Database(pass) connection successful to port: ', pass.port);
        
        // Create express instance to setup API
        const ExpressLoader = require("./loaders/Express");
        new ExpressLoader();
      })
      .catch(err => {
        console.error('Error: ', err, 'Database(pass) connect');
        return 0;
      });
      return 1;
    };

    
class ExpressLoader {
  constructor() {
    app = express();//module<-Node.js module server

    //If the file exists, it sends it back to the client with the appropriate content type (e.g., image/jpeg, text/css, etc.).
    //If the file doesn’t exist, Express.js continues to the next middleware or route handler
    //express.static, you can serve these files directly to clients without writing custom routes for each file.
    // app.use( express.static( path.join( __dirname, "FILE_TO_CLIENT" ) ) );// Serve static "images", "CSS", "JavaScript files",etc//express+middleware 

    app.use(bodyParser.json());// Parse JSON data

    // Set up middleware
    app.use(morgan("dev"));//morgan logging formats "combined","common","dev","short".
    app.use(compression());//compression middleware automatically 
    //compresses HTTP responses before sending them to the client (usually a web browser).

    app.use(ExpressLoader.errorHandler);// Setup error handling, this must be after all other middleware

    app.use(bodyParser.urlencoded({// Parse URL-encoded data

      extended: false,      //false option indicates that the parser should use the classic query string library
      //(Node.js’s built-in querystring module) to parse the data

      limit: payload_limit,//option sets the maximum size for the request body 
    }));




   // app.listen(3000, () => {console.log('App is listening on port 3000.');});
   if(!Pass_DB_Connect||!Store_DB_Connect)
   return null;
   
    app.listen(3000, () => { }).
      then(() => console.info('App Successfully callback to port: ', store.port)
        .catch(err => console.error(err)));
  
    app.listen(3001, () => { }).
      then(() => console.info('App Successfully callback to port: ', pass.port)
        .catch(err => console.error(err)));

    app.get('/', (req, res) => { res.send('App get Successfully response.'); });//define routes 
    
app.get('/cart', async (req, res) => {
    const allDogs = await Dog.find();
    return res.status(200).json(allDogs);
});

app.post('/cart', async (req, res) => {
    const newDog = new Dog({ ...req.body });
    const insertedDog = await newDog.save();
    return res.status(201).json(insertedDog);
});
    routes(app);// Pass app to routes

  }


  get Server() {
    return this.server;
  }

  /**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*}
   */
  static errorHandler(error, req, res, next) {
    let parsedError;


    try {// Attempt to gracefully parse error object
      if (error && typeof error === "object") {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      consol.error(e);
    }


    consol.error(parsedError);// Log the original error


    if (res.headersSent) { // If response is already sent, don't attempt to respond to client
      return next(error);
    }

    res.status(400).json({//invalid page 
      success: false,
      error
    });
  }
};

module.exports =  ExpressLoader;
