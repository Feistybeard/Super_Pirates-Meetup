const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/db');
const middy = require('@middy/core');

async function getAllMeetups() {
  try {
    const results = await db.scan({ TableName: 'meetup' }).promise();

    return sendResponse(200, { success: true, results: results.Items });
  } catch (error) {
    return sendError(500, { success: false, message: 'Error' });
  }
}

export const handler = middy(getAllMeetups).handler(getAllMeetups);
