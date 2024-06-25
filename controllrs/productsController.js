// const router=require('express').Router()
// const Book=require('../modal/book')
// const UserLibrary=require('../modal/user')
const router = require('express').Router()
const Products = require('../data/product.json')

router.get('/products', (req, res) => {
    console.log(req + res);
    console.log(Products);
    try {
        if (Products)
            res.status(200).json(Products.Products)
    }
    catch (err) {
        res.status(500).send(err)
    }
})


router.get('/Products/:id', (req, res) => {
    console.log(req + res);
    console.log(Products);
    try {
        if (Products) {
            let prod
            prod = Products.Products.filter(p => p.id == req.params.id)
            if (prod)
                res.status(200).json(prod)
            else
                res.status(200).send("not found")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.post('/Products', (req, res) => {
    console.log(req.body);
    console.log(Products);
    try {
        if (Products) {
            if (req.body) {
                Products.Products.push(req.body);
                res.status(200).json(Products.Products)
            }
            else
                res.status(200).send("no data")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})


router.put('/Products', (req, res) => {
    console.log(req + res);
    console.log(Products);
    try {
        if (Products) {
            if (req.body) {
                let prodId
                prodId = Products.Products.findIndex(p => p.id == req.body.id)
                if (prodId) {
                    Products.Products[prodId].name = req.body.name
                    Products.Products[prodId].amount = req.body.amount
                    res.status(200).json(Products.Products)
                }
            }
            else
                res.status(200).send("no data")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})


router.delete('/Products/:id', (req, res) => {
    console.log(req + res);
    console.log(Products);
    try {
        if (Products) {
            if (req.params.id) {
                let prodId
                prodId = Products.Products.findIndex(p => p.id == req.params.id)
                if (prodId) {
                    Products.Products.splice(prodId, 1)
                    res.status(200).json(Products.Products)
                }
            }
            else
                res.status(200).send("no data")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router
