const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 3000;

require("./db/conn")
const Customer = require("./model/signup");
const Order = require("./model/order");
const Contact = require("./model/contact");

const { json } = require("express");



//static paths
const staticPath = path.join(__dirname, "../public")
const templatePath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(staticPath))
app.set("view engine", "hbs")
app.set("views", templatePath)
hbs.registerPartials(partialPath)

//Home page
app.get("/", (req, res) => {
    res.render("index")
})

// //member page
app.get("/members", (req, res) => {
    res.render("members")
})

//services page
app.get("/services", (req, res) => {
    res.render("services")
})

//Order details page
app.get("/order_details", (req, res) => {
    res.render("order_details")
})


//Signup page
app.get("/signup", (req, res) => {
    res.render("signup")
})

//Create A New User in Our Database
app.post("/signup", async (req, res) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        //if password and confirm password is match then your account has been created
        if (password === cpassword) {

            const customerData = new Customer({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                password: password,
                confirmpassword: cpassword
            });

            

            //save the filled data in database
            const signedup = await customerData.save();
            // console.log(signedup)
            //after saved data home wil be visible you
            res.status(201).render("index")
            // res.send("Data Saved")

        } else {
            res.send("Invalid Login Details");
        }

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
})

//login page
app.get("/login", (req, res) => {
    res.render("login")
})

// //login page
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        //find email entered by user in database to login
        const userEmail = await Customer.findOne({ email: email })

        //Compare Password
        const isMatch = await bcrypt.compare(password, userEmail.password)

        if (isMatch) {
            res.status(201).render("order")
        } else {
            res.status(404).send("Invalid Login Details")
        }

    } catch (error) {
        res.status(400).send("Invalid Login Details")
        console.log(error)
    }
})


//order page
app.get("/order", (req, res) => {
    res.render("order")
})

// // //order page
app.post("/order", async (req, res) => {
    try {

        const name = req.body.name;

        const userName = await Customer.findOne({ name: name })
        
        //if name and sign-up name is match then your order has been confired
        if (userName.name === name) {

            const orderData = new Order({
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                productname: req.body.productname
            });

            //save the filled data in database
            const ordered = await orderData.save();
            // console.log(ordered)

            //after saved data home wil be visible you
            res.status(201).render("confirm_order")
            // res.send("order confirmed")
        }             

    } catch (error) {
        res.status(400).send("You Have To Sign Up.....!");
        console.log(error);
    }

})

//contact us page
app.get("/contact", (req, res) => {
    res.render("contact")
})

app.post("/contact", async (req, res) => {
    try {

        const name = req.body.name;

        const userName = await Customer.findOne({ name: name })
        
        //if name and sign-up name is match then your order has been confired
        if (userName.name === name) {

            const contactData = new Contact({
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                queries: req.body.queries
            });

            //save the filled data in database
            const ordered = await contactData.save();
            // console.log(ordered)

            //after saved data home wil be visible you
            res.status(201).render("index")
            // res.send("order confirmed")
        }             

    } catch (error) {
        res.status(400).send("You Have To Sign Up.....!");
        console.log(error);
    }
})


// server is listen at port no ${port}
app.listen(port, () => {
    console.log(`server is running on port no ${port}`)
})