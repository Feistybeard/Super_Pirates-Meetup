const bcrypt = require('bcryptjs');
const { db } = require('../services/db');

async function hashPassword(password) {
  const hashedPwd = await bcrypt.hash(password, 10);

  return hashedPwd;
}

async function comparePassword(password, hashedPwd) {
  const isMatch = await bcrypt.compare(password, hashedPwd);

  return isMatch ? true : false;
}

async function checkUsername(username) {
  const params = {
    TableName: 'users',
    FilterExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': username,
    },
  };

  const result = await db.scan(params).promise();

  return result;
}

module.exports = { hashPassword, comparePassword, checkUsername };
