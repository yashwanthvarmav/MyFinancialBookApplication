const models = require("../models");
const { validateToken } = require("./user");

async function createService(data) {
  try {
    const userExists = await models.User.findByPk(data.userId);
    if (!userExists) throw new Error("User not Exists");
    const lineItemExists = await models.LineItems.findByPk(data.lineItemId);
    if (!lineItemExists) throw new Error("Line Item does not exists");
    const service = await models.Services.create(data);
    return service;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createService,
};
