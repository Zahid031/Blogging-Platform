const router = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware')

const {
    dashboardController
} = require('../controllers/dashboardController')

router.get('/', isAuthenticated ,dashboardController)

module.exports = router;