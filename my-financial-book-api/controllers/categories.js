const models =  require('../models');
const logger = require('../helpers/logger');


async function listCategories({ categoryType }) {
    try {
        let categoryTypeExists = await models.CategoryType.findOne({ where: { name: categoryType } });
        const categories = await models.Category.findAll({
            where: { categoryTypeId: categoryTypeExists.id }
        });
        logger.info('Fetched categories list successfully')
        return categories;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function listSubCategories(data) {
    try {
        if (!data.categoryId) {
            logger.error('CategoryId is required')
            throw new Error('CategoryId is required');
        }
        const categoryExists = await models.Category.findByPk(data.categoryId);
        if (!categoryExists) {
            logger.error('Category does not exists')
            throw new Error('Category does not exists');
        }
        const subCategories = await models.SubCategory.findAll({
            where: { categoryId: data.categoryId }
        })
        logger.info('Fetched sub categories list successfully')
        return subCategories;
    } catch (error) {
         logger.error(error);
         throw error;
    }
}

module.exports = {
    listCategories,
    listSubCategories
}