const models =  require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(data) {
    try {
        const userExists = await models.User.findOne({
            where: { email: data.email }
        })
        if (userExists) {
            throw new Error('User already registered');
        }
        const hashPassword = await bcrypt.hashSync(data.password, 10);
        const result = await models.User.create({
            userName: data.userName,
            password: hashPassword,
            email: data.email,
            role: 'User'
        })
        return {
            email: data.email,
            userName: data.userName
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function login(data) {
    try {
        const userExists = await models.User.findOne({
            where: { email: data.email }
        })
        if (!userExists) {
            return {
                statusCode: 401,
                message: {
                  message: "We were unable to find a user for this email. Please SignUp!"
                }
              };
        }
        if (userExists) {
            if (await bcrypt.compare(data.password, userExists.password)) {
              const token = jwt.sign({ sub: userExists.id }, process.env.secret, {
                expiresIn: "7d",
              });

              return {
                statusCode: 200,
                message: {
                  message: "Login successful",
                  token: token
                }
              };
            } else {
              return {
                statusCode: 401,
                message: {
                  error: "Authentication failed"
                }
              };
            }
          } else {
            return {
              statusCode: 401,
              message: {
                error: "Authentication failed"
              }
            };
          }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function validateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  jwt.verify(token, process.env.secret, function (err, decoded) {
    if (err) {
      return err;
    } else {
      req.userId = decoded.id;
      next();
    }
  });
}


module.exports = {
    register,
    login,
    validateToken
}