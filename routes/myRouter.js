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
    res.render('home',{session:req.session.login})
})

router.get('/product',(req,res) =>{
    Product.find().exec((err,doc)=>{
        res.render('product',{product:doc,session:req.session.login})
    })
})

router.get('/about',(req,res)=>{
    res.render('about',{session:req.session.login})
})

router.get('/login',(req,res)=>{
    res.render('login',{session:req.session.login})
})

router.post('/signin',(req,res)=>{
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 30000000000000000000000000000
    console.log(username)   
    console.log(password)

    if (req.session.login){
        res.redirect('/product')
    }else{
        if(username === "admin" && password==="123"){
            req.session.username = username
            req.session.password = password
            req.session.login = true
            req.session.cookie.maxAge=timeExpire
            res.redirect('/manage')
        }
    }

    
})

router.get('/addform',(req,res)=>{
    res.render("form",{session:req.session.login})
})

router.get('/manage',(req,res)=>{
    if(req.session.login){
        Product.find().exec((err,doc)=>{
            res.render('manage',{product:doc,session:req.session.login})
        })
    }else{
        res.redirect('/login')
    }
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
        res.render('edit',{product:doc,session:req.session.login})
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
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:true}).exec(err=>{
        if(err) console.log(err)
        res.redirect('/manage')
    })
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

router.get('/sketchpaper',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('sketchpaper',{product:doc,session:req.session.login})
    })
})

router.get('/pencil',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('pencil',{product:doc,session:req.session.login})
    })
})

router.get('/pen',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('pen',{product:doc,session:req.session.login})
    })
})

router.get('/liquid',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('liquid',{product:doc,session:req.session.login})
    })
})

router.get('/hightlightpen',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('hightlightpen',{product:doc,session:req.session.login})
    })
})

router.get('/file',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('file',{product:doc,session:req.session.login})
    })
})

router.get('/logout',(req,res)=>{
    req.session.login = false
    res.redirect('/')
})


module.exports = router 