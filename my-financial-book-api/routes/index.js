const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, resetPassword, userListing } = require('./user')
const { validateToken, checkRole } = require('../controllers/user')
const { categoriesListing, subcategoriesListing } = require('./categories')
const { createDetails, updateDetails, getDetails, deleteDetails } = require('./incomeExpense') 

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, getProfile);
router.put('/profile', validateToken, updateProfile);
router.post('/reset-password', resetPassword);

router.get('/categories', validateToken, categoriesListing)
router.get('/subCategories', validateToken, subcategoriesListing)

router.post('/addDetails', validateToken, checkRole(['User']), createDetails);
router.put('/updateDetails/:id', validateToken, checkRole(['User']), updateDetails);
router.get('/getDetails', validateToken, checkRole(['User']), getDetails);
router.delete('/deleteDetails/:categoryType/:id', validateToken, checkRole(['User']), deleteDetails);

router.get('/users', validateToken, checkRole(['Admin']), userListing);

module.exports = router;