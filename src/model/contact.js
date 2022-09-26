const mongoose = require('mongoose');

//To Create order Schema of your Database

const contactSchema = new mongoose.Schema({
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
    queries: {
        type: String,
        required: true,
    }
});


//Create A Collections 
const Contact = new mongoose.model("ContactDetail", contactSchema);

//Exports customer to get collection 
module.exports =  Contact;