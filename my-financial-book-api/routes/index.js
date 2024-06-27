const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, resetPassword, userListing } = require('./user')
const { validateToken, checkRole } = require('../controllers/user')
const { categoriesListing, subcategoriesListing } = require('./categories')
const { createDetails, updateDetails, getDetails, deleteDetails, getIncome, getTopTransactions } = require('./incomeExpense')
const { createSavingsInvestments, getSavingsInvestments, updateSavingsInvestments, deleteSavingsInvestments } = require('./savingsInvestments')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, getProfile);
router.put('/profile', validateToken, updateProfile);
router.post('/reset-password', resetPassword);

router.get('/categories', validateToken, categoriesListing)
router.get('/subCategories', validateToken, subcategoriesListing)

router.post('/addIncomeExpense', validateToken, checkRole(['User']), createDetails);
router.put('/updateIncomeExpense/:id', validateToken, checkRole(['User']), updateDetails);
router.get('/getIncomeExpense', validateToken, checkRole(['User', 'Admin']), getDetails);
router.delete('/deleteIncomeExpense/:categoryType/:id', validateToken, checkRole(['User']), deleteDetails);

router.post('/addSavingsInvestments', validateToken, checkRole(['User']), createSavingsInvestments);
router.get('/getSavingsInvestments', validateToken, checkRole(['User', 'Admin']), getSavingsInvestments)
router.put('/updateSavingsInvestments/:id', validateToken, checkRole(['User']), updateSavingsInvestments);
router.delete('/deleteSavingsInvestments/:id', validateToken, checkRole(['User']), deleteSavingsInvestments);


router.get('/users', validateToken, checkRole(['Admin']), userListing);
// router.get('/income', validateToken, checkRole(['Admin']), getIncome);
router.get('/topTransactions', validateToken, getTopTransactions );
module.exports = router;