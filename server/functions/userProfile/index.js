import { sendResponse, sendError } from '../../responses';
import middy from '@middy/core';
import { db } from '../../services/db.js';
import { authorize } from '../../middleware/index.js';

async function getUserMeetups(event, context) {
  try {
    if (!event.auth) {
      return sendResponse(401, {
        success: false,
        message: 'Unauthorized user',
      });
    }

    const userId = event.auth.id;
    const meetups = await db
      .scan({
        TableName: 'meetup',
        FilterExpression: 'contains (attendees, :userId)',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();

    const username = await db
      .get({
        TableName: 'users',
        Key: {
          id: userId,
        },
      })
      .promise();

    return sendResponse(201, {
      success: true,
      message: 'Fetched user meetups successfully',
      data: meetups.Items,
      username: username.Item.username,
      userId: userId,
    });
  } catch (error) {
    return sendError(500, {
      success: false,
      message: 'Failed to fetch meetups',
    });
  }
}

export const handler = middy(getUserMeetups).use(authorize());
