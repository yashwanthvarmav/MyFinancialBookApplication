const { query } = require('express');
const models = require('../models');

async function addSavingsInvestments (data, userId) {
    try {
        if (userId) {
            const userExists = await models.User.findByPk(userId);
            if(!userExists) throw new Error('User not found');
        }
        const subCategoryExists = await models.SubCategory.findOne({
            where : { id: data.subCategoryId }
        });
        if (!subCategoryExists) throw new Error(`Sub Category doesn't exists`);
        
        const response = await models.SavingsAndInvestments.create({
            userId: userId,
            Title: data.Title,
            subCategoryId: data.subCategoryId,
            description: data.description,
            amount: data.amount,
            investmentStartedDate: data.investmentStartedDate,
            lockInPeriod: data.lockInPeriod,
            dateOfMaturity: data.dateOfMaturity,
            maturityAmount: data.maturityAmount,
            nextPaymentDate: data.nextPaymentDate
        })
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }
}


async function listSavingsInvestments(data, userId) {
    try {
        if (userId) {
            const userExists = await models.User.findByPk(userId);
            if(!userExists) throw new Error('User not found');
        }
        let subCategoryIds = [];
        let queryObj = { userId }
        if (data.categoryId) {
            subCategoryIds = await models.SubCategory.findAll({
                attributes: ['id'],
                where: { categoryId: data.categoryId }
            })
            subCategoryIds = subCategoryIds.map(ele => ele.id)
            queryObj = {
                ...queryObj,
                subCategoryId: { [Op.in]: subCategoryIds }
            }
        }
        const savings = await models.SavingsAndInvestments.findAndCountAll({
            where: queryObj,
            include: [
                {
                    model: models.SubCategory,
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: models.Category,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        })
        let response;
        if (savings.count > 0) {
            response = savings.rows.map(ele => {
                return ({
                    id: ele.id,
                    userId: ele.userId,
                    Title: ele.Title,
                    SubCategory: {
                        id: ele.SubCategory.id,
                        name: ele.SubCategory.name
                    },
                    Category: {
                        id: ele.SubCategory.Category.id,
                        name: ele.SubCategory.Category.name
                    },
                    description: ele.description,
                    amount: ele.amount,
                    investmentStartedDate: ele.investmentStartedDate,
                    lockInPeriod: ele.lockInPeriod,
                    dateOfMaturity: ele.dateOfMaturity,
                    maturityAmount: ele.maturityAmount,
                    nextPaymentDate: ele.nextPaymentDate
                })
            })
        }
        return {
            count: savings.count,
            result: response
        };
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function editSavingsInvestments(data, id) {
    try {
        if (id) {
            const savingsExists = await models.SavingsAndInvestments.findByPk(id);
            if(!savingsExists) throw new Error('SavingsInvestments not found');
        }
        const savings = await models.SavingsAndInvestments.update(data, { where: {id: id } })
        return savings
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteSavings ({ id }) {
    try {
        if (id) {
            const savingsExists = await models.SavingsAndInvestments.findByPk(id);
            if(!savingsExists) throw new Error('SavingsInvestments not found');
        }
        await models.SavingsAndInvestments.destroy({ where: { id } });
        return { id };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    addSavingsInvestments,
    listSavingsInvestments,
    editSavingsInvestments,
    deleteSavings
}