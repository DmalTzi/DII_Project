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

router.post('/signin',(req,res)=>{
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 30000  
    console.log(username)   
    console.log(password)

    if(username === "admin" && password==="123"){
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge=timeExpire
        res.redirect('/manage')
    }
})

router.get('/addform',(req,res)=>{
    res.render("form")
})

router.get('/manage',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('manage',{product:doc})
    })
})

router.get('/delete/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
        if(err) console.log(err)
        res.redirect('/manage')
    })
})

router.post('/edit',(req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        res.render('edit',{product:doc})
    })
})

router.post('/update',(req,res)=>{
    const update_id = req.body.update_id
    let data = {
        name:req.body.ProductName,
        price:req.body.ProductPrice,
        detail:req.body.ProductDetail,
        rating:req.body.ProductRating,
        catagory:req.body.ProductCatagory,
    }
    console.log(data)
    console.log(update_id)
    Product.findByIdAndUpdate(update_id,data,{useFindAndModify:true}).exec(err=>{
        res.redirect('/manage')
    })
})

router.post("/delete/:id",(req,res)=>{
    Product.findById()
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