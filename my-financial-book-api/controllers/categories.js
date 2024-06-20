const models =  require('../models');


async function listCategories({ categoryType }) {
    try {
        let categoryTypeExists = await models.CategoryType.findOne({ where: { name: categoryType } });
        const categories = await models.Category.findAll({
            where: { categoryTypeId: categoryTypeExists.id }
        });
        return categories;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function listSubCategories(data) {
    try {
        if (!data.categoryId) throw new Error('CategoryId is required');
        const categoryExists = await models.Category.findByPk(data.categoryId);
        if (!categoryExists) throw new Error('Category does not exists');
        const subCategories = await models.SubCategory.findAll({
            where: { categoryId: data.categoryId }
        })
        return subCategories;
    } catch (error) {
         console.log(error);
         throw error;
    }
}

module.exports = {
    listCategories,
    listSubCategories
}