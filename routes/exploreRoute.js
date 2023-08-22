const router = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");

const { exploreGetController } = require('../controllers/exploreController')

router.get('/', isAuthenticated, exploreGetController)

module.exports = router