const router = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware')
const profileValidator = require('../validator/dashboard/profileValidator')

const {
    dashboardController, 
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController
} = require('../controllers/dashboardController')

router.get('/', isAuthenticated ,dashboardController)

router.get('/create-profile', isAuthenticated, createProfileGetController)
router.post('/create-profile', isAuthenticated, profileValidator, createProfilePostController)

router.get('/edit-profile', isAuthenticated, editProfileGetController)
router.post('/edit-profile', isAuthenticated, profileValidator, editProfilePostController)

module.exports = router;