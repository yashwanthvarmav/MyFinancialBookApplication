const { query } = require('express');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment-timezone');
const logger = require('../helpers/logger');

async function createIncomeorExpense(data, userId) {
    try {
        const subCategoryExists = await models.SubCategory.findOne({
            where : { id: data.subCategoryId }
        });
        if (!subCategoryExists) {
            logger.error(`Sub Category doesn't exists`)
            throw new Error(`Sub Category doesn't exists`);
        }
        const categoryExists = await models.Category.findOne({
            include: [
                {
                    model: models.CategoryType,
                    attributes: ['name']
                }
            ],
            where: { id: subCategoryExists.categoryId }
        });
        if (categoryExists.CategoryType.name !== data.categoryType) {
            logger.error('Mismatch in categoryType and Category')
            throw new Error('Mismatch in categoryType and Category');
        }
        if (data.categoryType === 'Income') {
            const income = await models.Incomes.create({
                userId: userId,
                Title: data.Title,
                subCategoryId: data.subCategoryId,
                description: data.description,
                amount: data.amount,
                date: data.date
            })
            logger.info('Tracking for Income created successfully')
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
            logger.info('Tracking for Expense created successfully')
            return expense;
        }
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function updateIncomeorExpense(data, id) {
    try {
        if (id) {
            if (data.categoryType === 'Income') {
                let income = await models.Incomes.findByPk(id);
                if (!income) {
                    logger.error(`Income not found, Id is invalid`)
                    throw new Error(`Income not found, Id is invalid`)
                }
            } else if (data.categoryType === 'Expense') {
                let expense = await models.Expense.findByPk(id);
                if (!expense) {
                    logger.error(`Expense not found, Id is invalid`)
                    throw new Error(`Expense not found, Id is invalid`)
                }
            }
        }
        if (data.subCategoryId) {
            const subCategoryExists = await models.SubCategory.findOne({
                where : { id: data.subCategoryId }
            });
            if (!subCategoryExists) {
                logger.error(`Sub Category doesn't exists`)
                throw new Error(`Sub Category doesn't exists`);
            }
            const categoryExists = await models.Category.findOne({
                include: [
                    {
                        model: models.CategoryType,
                        attributes: ['name']
                    }
                ],
                where: { id: subCategoryExists.categoryId }
            });
            if (categoryExists.CategoryType.name !== data.categoryType) {
                logger.error('Mismatch in categoryType and Category')
                throw new Error('Mismatch in categoryType and Category');
            }
        }
        
        if (data.categoryType === 'Income') {
            let income = await models.Incomes.update(data, { where: { id } });
            logger.info('Tracking for Income updated successfully')
            return income;
        } else if (data.categoryType === 'Expense') {
            let expense = await models.Expense.update(data, { where: { id } });
            logger.info('Tracking for Expense updated successfully')
            return expense;
        }
    } catch(error) {
        logger.error(error);
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
        logger.info(`Fetched Income or Expense list`)
        return {
            count: response.length,
            sum,
            response
        };
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function deleteIncomeorExpense (data) {
    try {
        if (data.categoryType !== 'Income' && data.categoryType !== 'Expense') {
            logger.error('Invalid category type')
            throw new Error('Invalid category type');
        }
        if (data.categoryType === 'Income') {
            const incomeExists = await models.Incomes.findByPk(data.id);
            if (!incomeExists) throw new Error("Income not Found");
            await models.Incomes.destroy({ where: { id: data.id }});  
        } else if (data.categoryType === 'Expense') {
            const expenseExists = await models.Expense.findByPk(data.id);
            if (!expenseExists) throw new Error("Expense not Found");
            await models.Expense.destroy({ where: { id: data.id }});   
        }
        logger.info('Deleted Income or Expense successfully');
        return data.id;
    } catch(error) {
        logger.error(error);
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
                    date: ele.date || ele.investmentStartedDate,
                    user: ele.User,
                    createdAt: ele.createdAt,
                    updatedAt: ele.updatedAt
                })
            })
        }
        logger.info(`Top transactions fetched successfuly`);
        return {
            count: response.length,
            sum,
            response
        };
    } catch(error) {
        logger.error(error)
        throw error;
    }
}

const getSixMonthsAgo = () => {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    return new Date(now.getFullYear(), now.getMonth() - 6, 1);
};
  

async function listlastSixMonthsData(userId) {
    try {
        let queryObj = { }

        const userData = await models.User.findByPk(userId);
        if(userData.role !== 'Admin') {
            queryObj.userId = userId
        }

     
        const sixMonthsAgo = getSixMonthsAgo();
        const now = moment().tz('UTC').add(1, 'day');
        now.format('YYYY-MM-DD');
        queryObj.createdAt = {
            [Op.between]: [sixMonthsAgo, now],
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
        
        let income = await models.Incomes.findAll(queryOptions);
        let expense = await models.Expense.findAll(queryOptions);
        const savings = await models.SavingsAndInvestments.findAll(queryOptions)

        let result = [...income, ...expense, ...savings]
        const groupedData = result.reduce((acc, res) => {
            const month = res.createdAt.toLocaleString('default', { month: 'long' });
            if (!acc[month]) {
              acc[month] = [];
            }
            
            if(res.SubCategory.Category.categoryTypeId === 1) {
                acc[month].push({income: res.amount})
            } else if (res.SubCategory.Category.categoryTypeId === 2) {
                acc[month].push({expense: res.amount})
            }
            else if (res.SubCategory.Category.categoryTypeId === 3) acc[month].push({savingInvestment: res.amount})
            return acc;
        }, {});

        let response = {};
        for (const month in groupedData) {
            if (groupedData.hasOwnProperty(month)) {
                let incomeSum = 0;
                let expenseSum = 0;
                let savingInvestmentSum = 0;
    
                groupedData[month].forEach(entry => {
                    if (entry.income) {
                        incomeSum += entry.income;
                    }
                    if (entry.expense) {
                        expenseSum += entry.expense;
                    }
                    if (entry.savingInvestment) {
                        savingInvestmentSum += entry.savingInvestment;
                    }
                });
    
                response[month] = {
                    income: incomeSum,
                    expense: expenseSum,
                    savingInvestment: savingInvestmentSum
                };
            }
        }
        logger.info('Fetched last six months data successfully')
        return response;

    } catch(error) {
        logger.error(error)
        throw error;
    }
}

async function listDataCategoriesWise (userId) {
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
                }
            ]
        }


        let income = await models.Incomes.findAll(queryOptions);
        let expense = await models.Expense.findAll(queryOptions);
        let savings = await models.SavingsAndInvestments.findAll(queryOptions)
        
        let result = [...income, ...expense, ...savings]

        return result.reduce((acc, item) => {
            const categoryId = item.SubCategory.Category.id;
            if (!acc[categoryId]) {
                acc[categoryId] = {
                    categoryName: item.SubCategory.Category.name,
                    totalAmount: 0
                };
            }
            acc[categoryId].totalAmount += item.amount;
            logger.info(`Data fetched category wise successfuly`);
            return acc;
        }, {});

    } catch(error) {
        logger.error(error)
        throw error;
    }
}

async function getIncomeExpenseSavingsSum (userId) {
    try {

        let queryObj = {}

        const userData = await models.User.findByPk(userId);
        if(userData.role !== 'Admin') {
            queryObj.userId = userId
        }


        let income = await models.Incomes.findAll({where: queryObj});
        let expense = await models.Expense.findAll({where: queryObj});
        let savings = await models.SavingsAndInvestments.findAll({where: queryObj})

        income = income.map(ele => ele.amount);
        expense = expense.map(ele => ele.amount);
        savings = savings.map(ele => ele.amount)
        
        let incomeSum =  income.reduce((totalIncome, item) => {
            return totalIncome += item
        }, 0);
        let expenseSum =  expense.reduce((totalExpense, item) => {
            return totalExpense += item
        }, 0);
        let savingsSum =  savings.reduce((totalSavings, item) => {
            return totalSavings += item
        }, 0);
        logger.info(`Total amount fetched successfuly`);
        return {
            incomeSum,expenseSum,savingsSum
        };
    } catch(error) {
        logger.error(error)
        throw error;
    }
}


module.exports = {
    createIncomeorExpense,
    updateIncomeorExpense,
    getIncomeorExpense,
    deleteIncomeorExpense,
    listTopTransactions,
    listlastSixMonthsData,
    listDataCategoriesWise,
    getIncomeExpenseSavingsSum
}