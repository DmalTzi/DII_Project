// use mongoose
const mongoose = require('mongoose')

// connect mongodb alats
const mongodburl = "<Your MongoDB url>"


mongoose.connect(mongodburl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

// schema design

let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    detail:String,
    rating:Number,
    catagory:String,
    image:String
})

// carete mode
let Product = mongoose.model("product",productSchema)

module.exports = Product

// export model
module.exports.save=function(model,data){
    model.save(data)
}