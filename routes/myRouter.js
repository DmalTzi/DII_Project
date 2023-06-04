const express = require('express')
const router = express.Router()
const Product = require('../model/product')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/image/products')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")
    }
})

const upload = multer({
    storage:storage
})
7
router.get('/',(req,res) =>{
    res.render('home')
})

router.get('/product',(req,res) =>{
    Product.find().exec((err,doc)=>{
        res.render('product',{product:doc})
    })
})

router.get('/about',(req,res)=>{
    res.render('about')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/addform',(req,res)=>{
    res.render("form")
})

router.post('/insert',upload.single("ProductImage") ,(req,res)=>{
    console.log(req.file);
    let data = new Product({
        name:req.body.ProductName,
        price:req.body.ProductPrice,
        detail:req.body.ProductDetail,
        rating:req.body.ProductRating,
        catagory:req.body.ProductCatagory,
        image:req.file.filename
    })
    Product.save(data,(err)=>{
        if(err) console.log(err)
        res.redirect('/addform')
    })
    console.log(data)
})

module.exports = router 