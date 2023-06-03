const express = require('express')
const router = express.Router()


router.get('/',(req,res) =>{
    res.render('home')
})

router.get('/product',(req,res) =>{
    const product = [
        {name:"เสื้อผ้า", pric:500, image:"image/product1"},
        {name:"พัดลม", pric:200, image:"image/product1"},
        {name:"เสื้อผ้า", pric:500, image:"image/product1"},
        {name:"พัดลม", pric:200, image:"image/product1"},
        {name:"เสื้อผ้า", pric:500, image:"image/product1"},
        {name:"พัดลม", pric:200, image:"image/product1"},
        {name:"เสื้อผ้า", pric:500, image:"image/product1"},
        {name:"พัดลม", pric:200, image:"image/product1"},
    ]
    res.render('product',{name:product})
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
// router.get('/product/:id',(req,res) =>{
//     const myparam = req.params.id
//     myste = `<h1>Hello World ${myparam}</h1>`
//     res.send(myste)
// })

module.exports = router 