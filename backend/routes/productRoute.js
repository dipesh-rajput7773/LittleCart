const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const ensureAdminAuth = require('../middleware/ensureAdminAuth')


router.post("/createproduct",productCtrl.createProduct)
// router.get("/getproduct/:id",productCtrl.getProduct)


// router.post("/login",authCtrl.login)
// router.get("/verifyadmin",ensureAdminAuth ,authCtrl.verifyToken)


module.exports = router