const router = require('express').Router()
const attributeValueCtrl = require('../controllers/attributeValueCtrl')
const ensureAdminAuth = require('../middleware/ensureAdminAuth')


router.post("/createattributevalue",attributeValueCtrl.createAttributeValue)


// router.post("/login",authCtrl.login)
// router.get("/verifyadmin",ensureAdminAuth ,authCtrl.verifyToken)


module.exports = router