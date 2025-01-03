const router = require('express').Router()
const attributCtrl = require('../controllers/attributCtrl')
const ensureAdminAuth = require('../middleware/ensureAdminAuth')

router.post("/createattribute",attributCtrl.createAttribute)
router.get("/getattrWithval/:id",attributCtrl.getAttributeWithValues)
router.get("/getallattribute",attributCtrl.getAllAtributeWithoutValue)


// router.post("/login",authCtrl.login)
// router.get("/verifyadmin",ensureAdminAuth ,authCtrl.verifyToken)


module.exports = router