const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const ensureAdminAuth = require('../middleware/ensureAdminAuth')


router.post("/createcategory",ensureAdminAuth,categoryCtrl.createCategory)


// router.post("/login",authCtrl.login)
// router.get("/verifyadmin",ensureAdminAuth ,authCtrl.verifyToken)


module.exports = router