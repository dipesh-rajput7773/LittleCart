const router = require('express').Router()
const ensureAdminAuth = require('../middleware/ensureAdminAuth')
const categoryCtrl = require('../controllers/categoryCtrl')
const upload = require('../middleware/uploadMiddleware')

// category
router.post("/add-category",upload,categoryCtrl.addCategory)


module.exports = router