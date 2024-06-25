const router = require('express').Router()
const categoies = require('../data/Caterory.json')

router.get('/caterories', (req, res) => {
    console.log(req + res);
    console.log(categoies);
    try {
        if (categoies)
            res.status(200).json(categoies.Caterogier)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.get('/caterories/:id', (req, res) => {
    console.log(req + res);
    console.log(categoies);
    try {
        if (categoies) {
            let category
            category = categoies.Caterogier.filter(p => p.id == req.params.id)
            if (category)
                res.status(200).json(category)
            else
                res.status(200).send("not found")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.post('/caterories', (req, res) => {
    console.log(req.body);
    console.log(categoies);
    try {
        if (categoies) {
            if (req.body) {
                categoies.Caterogier.push(req.body);
                res.status(200).json(categoies.Caterogier)
            }
            else
                res.status(200).send("no data")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})


router.put('/caterories', (req, res) => {
    console.log(req + res);
    console.log(categoies);
    try {
        if (categoies) {
            if (req.body) {
                let categoryId
                categoryId = categoies.Caterogier.findIndex(p => p.id == req.body.id)
                if (categoryId) {
                    categoies.Caterogier[categoryId].nameCategory = req.body.nameCategory
                    res.status(200).json(categoies.Caterogier)
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


router.delete('/caterories/:id', (req, res) => {
    console.log(req + res);
    console.log(categoies);
    try {
        if (categoies) {
            if (req.params.id) {
                let categoryId
                categoryId = categoies.Caterogier.findIndex(p => p.id == req.params.id)
                if (categoryId) {
                    Caterogier.Caterogier.splice(categoryId, 1)
                    res.status(200).json(categoies.Caterogier)
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