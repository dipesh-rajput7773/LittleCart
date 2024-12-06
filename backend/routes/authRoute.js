const router = require('express').Router()
const authCtrl = require('../controllers/authCtrl')
const ensureAdminAuth = require('../middleware/ensureAdminAuth')

router.post("/register", authCtrl.register)
router.post("/login", authCtrl.login)
router.get("/verifyadmin",ensureAdminAuth ,authCtrl.verifyToken)


module.exports = router