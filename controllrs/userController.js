const router = require('express').Router()
const Users = require('../data/users.json')
const Products = require('../data/product.json')
let currentUser = null;

//קבלת כל המשתמשים
router.get('/users', (req, res) => {
    console.log(req + res);
    console.log(Users);
    res.status(200).json(Users.Users)

})

//עדכון מוצר שבנא הזמין
router.post('/user/products/:idProduct', (req, res) => {
    console.log(req + res);
    console.log(Users);
    let productToAdd = {
        "id": req.params.idProduct,
        "amountToUser": 1
    }
    console.log(productToAdd);
    if (!currentUser) {
        res.status(404).json({ "massage": "no login user" })
    }
    currentUser.products.push(productToAdd)
    console.log(productToAdd + currentUser);
    if (currentUser.products)
        return res.status(200).json(currentUser.products)

    return res.status(404).json({ "massage": "error" })
})

//קבלת כל המוצרים שהזמין בנא אחד
router.get('/user/products', (req, res) => {
    console.log(req + res);
    console.log(Users);
    if (!currentUser) {
        res.status(404).json({ "massage": "no login user" })
    }
    userId = currentUser.id;
    console.log(userId);
    userProducts = currentUser.products;
    console.log("!!!!!", userProducts)
    if (userProducts !== null)
        return res.status(200).json({ userProducts })

    // else {

    //     return res.status(404).json({ message: "product of user not found" })
    // }

})


router.get('/user', (req, res) => {
    return res.status(200).json(currentUser)
})


//קבלת מוצר מסוים שבנא הזמין
//אני מחפשת את המוצר עם קוד 1 שהזמין בנא מסויים
router.put('/user/products/:productId', (req, res) => {

    if (!currentUser) {
        return res.status(404).json({ "massage": "no login user" })
    }
    console.log(req + res);
    console.log(Users);
    const reqProductId = req.params.productId;
    console.log("currentUser.products", currentUser.products);
    console.log("reqProductId   ", reqProductId);

    const product = currentUser.products.find(p => +p.id === +reqProductId);
    if (!product) {
        return res.status(404).json({ "massage": "product not found" })
    }
    product.amountToUser = req.body.amountToUser;
    if (currentUser && currentUser.products)
        return res.status(200).json({ "message": "the amount of product to User update,", product })

    return res.status(404).json({ message: "product not found" })

})

//התנתקות
//מחיקת משתמש נוכחי
router.delete('/user/logout', (req, res) => {
    console.log(req + res);
    console.log(Users);

    currentUser = null;
    console.log(currentUser);
    return res.status(200).json({ "message": "the user deleted" })

    // return res.status(404).json({ message: "user not found" })
})

//הצטרפות- הוספת לקוח חדש
//מקבלת אובייקט כ-BODY 
//במבנה הבא:
// "id": "1",
//             "name": "SARA",
//             "password": "SARA",
//             "mail": "Sara@gmail.com",
//             "products": []

//משווה לפי כתובת המייל אם כבר קיים במערכת
//אם קיים- תחזיר תשובה
//the user already declared"

//אחרת- אם אינו קיים במערכת
//מוסיף אותו למערכת
//ומחזיר תשובה:user created
router.post('/user/register', (req, res) => {
    console.log(req + res);
    const { name, password, mail } = req.body;

    console.log(name, password);
    console.log(Users);
    for (i = 0; i < Users.Users.length; i++) {
        if (Users.Users[i].mail.toUpperCase() === mail.toUpperCase())
            return res.status(404).json({ "message": "the user already declared" })
    }


    currentUser = {
        "id": Users.Users.length + 1,
        "name": name,
        "password": password,
        "mail": mail,
        "products": []
    }
    Users.Users.push(currentUser);
    return res.status(200).json({ message: "user created", user: currentUser })

})

//פונקציית כניסה למערכת
//מקבלת אובייקט המכיל 2 שדות:
 //{mail,password}
 //הbody האובייקט נשלח כ-
//ובודקת לפי כתובת המייל והסיסמה האם קיים במערכת
//במידה וקיים במערכת-
//מחזירה את שם המשתמש
//במידה ולא קיים- מחזירה הודעה:password

router.post('/user/login', (req, res) => {
    debugger
    const userMail = req.body.mail;
    const password = req.body.password;
    console.log(userMail, password);
    console.log(Users);
    for (i = 0; i < Users.Users.length; i++) {
        if (Users.Users[i].mail.toUpperCase() === userMail.toUpperCase() && Users.Users[i].password === password) {
            currentUser = Users.Users[i];
            return res.status(200).json({ "name": currentUser.name })
        }
    }
    return res.status(404).send("password")
})
module.exports = router

