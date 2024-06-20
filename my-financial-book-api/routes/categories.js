const { listCategories, listSubCategories } = require('../controllers/categories');
const Joi = require('joi');

const categoryListingSchema = Joi.object({
    categoryType: Joi.string().valid('Income', 'Expense').required()
  });

async function categoriesListing(req, res) {
    try {
        let data = req.query
        const { error, value } = categoryListingSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await listCategories(data);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function subcategoriesListing(req, res) {
    try {
        const data = req.query;
        const result = await listSubCategories(data);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}


module.exports = {
    categoriesListing,
    subcategoriesListing,
    categoryListingSchema
}