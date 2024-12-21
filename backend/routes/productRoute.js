const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const ensureAdminAuth = require('../middleware/ensureAdminAuth')
const upload = require('../middleware/uploadMiddleware')

router.post("/createproduct", upload, productCtrl.createProduct)
router.get("/getallproducts", productCtrl.getAllProduct)
router.get("/product/:id", productCtrl.getProductById)
router.patch("/updateproduct/:id", productCtrl.updateProduct)

// router.post("/login",authCtrl.login)
// router.get("/verifyadmin",ensureAdminAuth ,authCtrl.verifyToken)

module.exports = router