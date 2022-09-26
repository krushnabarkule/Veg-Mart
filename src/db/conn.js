const mongoose = require("mongoose")

//to connect or create our database
mongoose.connect("mongodb://localhost:27017/vegMartData",{
    useUnifiedTopology : true,
    useNewUrlParser : true ,
}).then( () =>{
    console.log(`Connection successfull`)
}).catch((e) =>{
    console.log(`No connection`)
    // console.log(e)
})

