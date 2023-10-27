import middy from '@middy/core';
import { db } from '../../services/db.js';
import { sendResponse } from '../../responses';
import { authorize } from '../../middleware/index.js';

async function getMeetups() {
  try {
    const params = {
      TableName: 'meetup',
    };
    const { Items } = await db.scan(params).promise();
    return Items;
  } catch (error) {
    return sendResponse(400, { message: message.error });
  }
}

async function lambda() {
  try {
    const meetups = await getMeetups();

    return sendResponse(200, {
      success: true,
      result: meetups.length,
      meetups,
    });
  } catch (error) {
    return sendResponse(400, {
      success: false,
    });
  }
}

export const handler = middy(lambda).use(authorize());
