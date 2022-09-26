const mongoose = require('mongoose');

//To Create order Schema of your Database

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: false
    },
    address: {
        type: String,
        required: true,
        unique: false
    },
    productname: {
        type: String,
        required: true,
    }
});


//Create A Collections 
const Order = new mongoose.model("OrderDetail", orderSchema);

//Exports customer to get collection 
module.exports =  Order;