const { sendResponse, sendError } = require('../../responses');
const { comparePassword, checkUsername } = require('../../utils/helpers');
const jwt = require('jsonwebtoken');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');

async function login(event) {
  const { username, password } = event.body;

  try {
    const result = await checkUsername(username);
    console.log(result);
    const usersFound = result.Count;

    if (usersFound === 0) {
      return sendError(404, { success: false, message: 'User not found' });
    }

    const userData = result.Items[0];
    const storedPasswordHash = userData.password;
    const passwordMatch = await comparePassword(password, storedPasswordHash);

    if (!passwordMatch) {
      return sendError(400, { success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    console.log(token);
    return sendResponse(200, {
      success: true,
      message: `User ${username} successfully logged in!`,
      token: token,
      id: userData.id,
    });
  } catch (error) {
    return sendError(500, { success: false, error: error });
  }
}

export const handler = middy(login).use(jsonBodyParser()).handler(login);
