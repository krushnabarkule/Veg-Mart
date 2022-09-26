const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

// To define schema of your Database
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    }
});

customerSchema.pre("save",async function(next){

    if(this.isModified("password")){

        // const passwordHash = await bcrypt.hash(password, 10);
        this.password = await bcrypt.hash(this.password, 10)
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10)
    }
    
    next();
})


//Create A Collections 
const Customer = new mongoose.model("CustomerDetail", customerSchema);

//Exports customer to get collection 
module.exports = Customer;