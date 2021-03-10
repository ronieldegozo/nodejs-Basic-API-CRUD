const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/product');
const orders = require('./api/routes/orders');

                                                                                        //NodeJSAPI the name for the databasename into a mongodb
mongoose.connect('mongodb+srv://roniel:roniel12345@node-rest-api-shop.hw5fs.mongodb.net/NodeJSAPI?retryWrites=true&w=majority', {
    useNewUrlParser: true,  useUnifiedTopology: true 
})



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));



app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3636');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use('/products', productRoutes);
app.use('/orders', orders);


app.use((req,res,next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})



module.exports = app;