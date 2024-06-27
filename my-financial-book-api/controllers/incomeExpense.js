const { query } = require('express');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function createIncomeorExpense(data, userId) {
    try {
        const subCategoryExists = await models.SubCategory.findOne({
            where : { id: data.subCategoryId }
        });
        if (!subCategoryExists) throw new Error(`Sub Category doesn't exists`);
        const categoryExists = await models.Category.findOne({
            include: [
                {
                    model: models.CategoryType,
                    attributes: ['name']
                }
            ],
            where: { id: subCategoryExists.categoryId }
        });
        if (categoryExists.CategoryType.name !== data.categoryType) throw new Error('Mismatch in categoryType and Category');
        if (data.categoryType === 'Income') {
            const income = await models.Incomes.create({
                userId: userId,
                Title: data.Title,
                subCategoryId: data.subCategoryId,
                description: data.description,
                amount: data.amount,
                date: data.date
            })
            return income;
        } else if (data.categoryType === 'Expense') {
            const expense = await models.Expense.create({
                userId: userId,
                Title: data.Title,
                subCategoryId: data.subCategoryId,
                description: data.description,
                amount: data.amount,
                date: data.date
            })
            return expense;
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function updateIncomeorExpense(data, id) {
    try {
        if (id) {
            if (data.categoryType === 'Income') {
                let income = await models.Incomes.findByPk(id);
                if (!income) throw new Error(`Income not found, Id is invalid`)
            } else if (data.categoryType === 'Expense') {
                let expense = await models.Expense.findByPk(id);
                if (!expense) throw new Error(`Expense not found, Id is invalid`)
            }
        }
        if (data.subCategoryId) {
            const subCategoryExists = await models.SubCategory.findOne({
                where : { id: data.subCategoryId }
            });
            if (!subCategoryExists) throw new Error(`Sub Category doesn't exists`);
            const categoryExists = await models.Category.findOne({
                include: [
                    {
                        model: models.CategoryType,
                        attributes: ['name']
                    }
                ],
                where: { id: subCategoryExists.categoryId }
            });
            if (categoryExists.CategoryType.name !== data.categoryType) throw new Error('Mismatch in categoryType and Category');
        }
        
        if (data.categoryType === 'Income') {
            let income = await models.Incomes.update(data, { where: { id } });
            return income;
        } else if (data.categoryType === 'Expense') {
            let expense = await models.Expense.update(data, { where: { id } });
            return expense;
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function getIncomeorExpense (data, userId) {
    try {
        let result
        let subCategoryIds = [];
        let queryObj = {}

        const userData = await models.User.findByPk(userId);
        if(userData.role !== 'Admin') {
            queryObj.userId = userId
        }
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

        let queryOptions = {
            where: queryObj,
            include: [
                {
                    model: models.SubCategory,
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: models.Category,
                            attributes: ['id', 'name'],
                        }
                    ]
                },
                {
                    model: models.User,
                    attributes: ['id', 'userName', 'email']
                }
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
        }
        if (data.limit) queryOptions.limit = data.limit
        console.log(queryOptions);

        if (data.categoryType === 'Income') {
            result = await models.Incomes.findAndCountAll(queryOptions);
        } else if (data.categoryType === 'Expense') {
            result = await models.Expense.findAndCountAll(queryOptions);
        }
        let response = [];
        let sum = 0
        if (result.count > 0) {
            response = result.rows.map(ele => {
                sum += ele.amount
                return ({
                    id: ele.id,
                    Title: ele.Title,
                    SubCategory: {
                        id: ele.SubCategory.id,
                        name: ele.SubCategory.name
                    },
                    Category: ele.SubCategory.Category,
                    description: ele.description,
                    amount: ele.amount,
                    date: ele.date,
                    user: ele.User,
                    createdAt: ele.createdAt,
                    updatedAt: ele.updatedAt
                })
            })
        }
        return {
            count: response.length,
            sum,
            response
        };
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function deleteIncomeorExpense (data) {
    try {
        if (data.categoryType !== 'Income' && data.categoryType !== 'Expense') throw new Error('Invalid category type');
        if (data.categoryType === 'Income') {
            const incomeExists = await models.Incomes.findByPk(data.id);
            if (!incomeExists) throw new Error("Income not Found");
            await models.Incomes.destroy({ where: { id: data.id }});  
        } else if (data.categoryType === 'Expense') {
            const expenseExists = await models.Expense.findByPk(data.id);
            if (!expenseExists) throw new Error("Expense not Found");
            await models.Expense.destroy({ where: { id: data.id }});   
        }
        return data.id;
    } catch(error) {
        console.log(error);
        throw error;
    }
}


async function listTopTransactions (userId) {
    try {
        let subCategoryIds = [];
        let queryObj = {}

        const userData = await models.User.findByPk(userId);
        if(userData.role !== 'Admin') {
            queryObj.userId = userId
        }

        let queryOptions = {
            where: queryObj,
            include: [
                {
                    model: models.SubCategory,
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: models.Category,
                            attributes: ['id', 'name'],
                        }
                    ]
                },
                {
                    model: models.User,
                    attributes: ['id', 'userName', 'email']
                }
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 2
        }


        let income = await models.Incomes.findAll(queryOptions);
        let expense = await models.Expense.findAll(queryOptions);
        let savings = await models.SavingsAndInvestments.findAll(queryOptions)
        
        let result = [...income, ...expense, ...savings]

        let response = [];
        let sum = 0
        if (result.length > 0) {
            response = result.map(ele => {
                sum += ele.amount
                return ({
                    id: ele.id,
                    Title: ele.Title,
                    SubCategory: {
                        id: ele.SubCategory.id,
                        name: ele.SubCategory.name
                    },
                    Category: ele.SubCategory.Category,
                    description: ele.description,
                    amount: ele.amount,
                    date: ele.date,
                    user: ele.User,
                    createdAt: ele.createdAt,
                    updatedAt: ele.updatedAt
                })
            })
        }
        return {
            count: response.length,
            sum,
            response
        };
    } catch(error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    createIncomeorExpense,
    updateIncomeorExpense,
    getIncomeorExpense,
    deleteIncomeorExpense,
    listTopTransactions
}