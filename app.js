mongodburl = "mongodb+srv://DmalTzi:<1234d>@cluster0.wp3h7jh.mongodb.net/?retryWrites=true&w=majority"

const express = require('express')
const router= require('./routes/myRouter');
const path = require('path')
const app = express()

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(router)
app.use(express.static(path.join(__dirname,'public')))

app.listen(8080,()=>{
    console.log("Sever run on port 8080")
})