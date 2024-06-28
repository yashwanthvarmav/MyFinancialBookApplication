const Joi = require('joi');
const { createIncomeorExpense, updateIncomeorExpense, getIncomeorExpense, deleteIncomeorExpense, listTopTransactions, listlastSixMonthsData, listDataCategoriesWise, getIncomeExpenseSavingsSum } = require('../controllers/incomeExpense');
const { categoryListingSchema } = require('./categories')

const createDetailsSchema = Joi.object({
    categoryType: Joi.string().valid('Income', 'Expense').required(),
    Title: Joi.string().required(),
    subCategoryId: Joi.number().required(),
    description: Joi.string(),
    amount: Joi.number().required(),
    date: Joi.date()
});

const updateDetailsSchema = Joi.object({
    categoryType: Joi.string().valid('Income', 'Expense').required(),
    Title: Joi.string(),
    subCategoryId: Joi.number(),
    description: Joi.string(),
    amount: Joi.number(),
    date: Joi.date()
});

const getDetailsSchema = Joi.object({
    categoryType: Joi.string().valid('Income', 'Expense').required(),
    categoryId: Joi.string(),
    limit: Joi.number()
  });

async function createDetails(req, res) {
    try {
        let data = req.body
        const { error, value } = createDetailsSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createIncomeorExpense(data, req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function updateDetails(req, res) {
    try {
        let data = req.body
        const { error, value } = updateDetailsSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await updateIncomeorExpense(data, req.params.id);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getDetails(req, res) {
    try {
        let data = req.query;
        const { error, value } = getDetailsSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await getIncomeorExpense(data, req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function deleteDetails(req, res) {
    try {
        const result = await deleteIncomeorExpense(req.params);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getTopTransactions(req, res) {
    try {
        const result = await listTopTransactions(req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getlastSixMonthsData(req, res) {
    try {
        const result = await listlastSixMonthsData(req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getDataCategoriesWise(req, res) {
    try {
        const result = await listDataCategoriesWise(req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getTotalSum(req, res) {
    try {
        const result = await getIncomeExpenseSavingsSum(req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    createDetails,
    updateDetails,
    getDetails,
    deleteDetails,
    getTopTransactions,
    getlastSixMonthsData,
    getDataCategoriesWise,
    getTotalSum
}