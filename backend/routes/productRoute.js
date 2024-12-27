const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const ensureAdminAuth = require('../middleware/ensureAdminAuth')
const upload = require('../middleware/uploadMiddleware')

// Correct route setup to ensure multer handles the file
router.patch("/updateproduct/:id", upload, productCtrl.updateProduct);
router.get("/getallproducts", productCtrl.getAllProduct)
router.get("/product/:id", productCtrl.getProductById)
router.delete("/deleteproduct/:id", productCtrl.deleteProduct)

// Add routes for creating products
router.post("/createproduct", upload, productCtrl.createProduct)
router.post("/createvariationproducts", upload, productCtrl.createVariationProducts)

// router.post("/login",authCtrl.login)
// router.get("/verifyadmin",ensureAdminAuth ,authCtrl.verifyToken)

module.exports = router