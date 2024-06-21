const Joi = require('joi');
const { addSavingsInvestments, listSavingsInvestments, editSavingsInvestments, deleteSavings } = require('../controllers/savingsInvestments');
const { categoryListingSchema } = require('./categories')

const createSavingsInvestmentsSchema = Joi.object({
    Title: Joi.string().required(),
    subCategoryId: Joi.number().required(),
    description: Joi.string(),
    amount: Joi.number().required(),
    investmentStartedDate: Joi.date(),
    lockInPeriod: Joi.string().regex(/^\d+(\.\d{1,2})?$/),
    dateOfMaturity: Joi.date(),
    maturityAmount: Joi.number(),
    nextPaymentDate: Joi.date()
});

const updateSavingsInvestmentSchema = Joi.object({
    Title: Joi.string(),
    subCategoryId: Joi.number(),
    description: Joi.string(),
    amount: Joi.number(),
    investmentStartedDate: Joi.date(),
    lockInPeriod: Joi.string().regex(/^\d+(\.\d{1,2})?$/),
    dateOfMaturity: Joi.date(),
    maturityAmount: Joi.number(),
    nextPaymentDate: Joi.date()
});

async function createSavingsInvestments(req, res) {
    try {
        let data = req.body
        const { error, value } = createSavingsInvestmentsSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await addSavingsInvestments(data, req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function updateSavingsInvestments(req, res) {
    try {
        let data = req.body
        const { error, value } = updateSavingsInvestmentSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await editSavingsInvestments(data, req.params.id);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getSavingsInvestments(req, res) {
    try {
        const result = await listSavingsInvestments(req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function deleteSavingsInvestments(req, res) {
    try {
        const result = await deleteSavings(req.params);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}


module.exports = {
    createSavingsInvestments,
    getSavingsInvestments,
    updateSavingsInvestments,
    deleteSavingsInvestments
}