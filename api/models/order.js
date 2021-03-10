const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId, //ID MUST UNIQUE
    name: String, //this name quantity and color is look like a database table name 
    quantity: Number,
    color: String
});
                               //Order is look like a class that you can use this Order to the routes
module.exports = mongoose.model('Order', orderSchema);