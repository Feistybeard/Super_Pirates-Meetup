const { sendResponse, sendError } = require('../../responses');
const { db } = require('../../services/db');
const { nanoid } = require('nanoid');
import middy from '@middy/core';
const jsonBodyParser = require('@middy/http-json-body-parser');
const { hashPassword, checkUsername } = require('../../utils/helpers');

async function signup(event) {
  const { username, password } = event.body;

  const hashedPwd = await hashPassword(password);
  const result = await checkUsername(username);
  const usersFound = result.Count;

  try {
    if (usersFound === 1) {
      return sendError(400, { success: false, message: 'Username already exists' });
    }

    const params = {
      TableName: 'users',
      Item: {
        id: nanoid(),
        username: username,
        password: hashedPwd,
        meetups: [],
      },
    };

    await db.put(params).promise();

    return sendResponse(200, {
      success: true,
      message: 'User account created',
      username: username,
    });
  } catch (error) {
    return sendError(500, {
      success: false,
      message: 'Could not create user account',
      error: error,
    });
  }
}

export const handler = middy(signup).use(jsonBodyParser()).handler(signup);
