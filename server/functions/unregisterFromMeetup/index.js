import { sendResponse, sendError } from '../../responses';
import { db } from '../../services/db';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { authorize } from '../../middleware/index';

async function unregisterFromMeetup(event) {
  const { meetupId } = event.pathParameters;
  const userId = event.auth.id;

  const params = {
    TableName: 'meetup',
    Key: { id: meetupId },
  };

  try {
    const meetup = await db.get(params).promise();

    if (!meetup.Item) {
      return sendError(404, {
        success: false,
        message: 'Meetup does not exist',
      });
    }

    if (!meetup.Item.attendees.includes(userId)) {
      return sendError(400, {
        success: false,
        message: 'User is not in the attendees list',
      });
    }

    meetup.Item.attendees = meetup.Item.attendees.filter((id) => id !== userId);

    await db
      .update({
        TableName: 'meetup',
        Key: { id: meetupId },
        UpdateExpression: 'SET attendees = :attendees',
        ExpressionAttributeValues: {
          ':attendees': meetup.Item.attendees,
        },
      })
      .promise();

    return sendResponse(200, {
      success: true,
      message: 'User successfully unregistred from event',
      meetup: meetup,
    });
  } catch (error) {
    console.log(error);
    return sendError(500, { success: false, message: error });
  }
}

export const handler = middy(unregisterFromMeetup).use(jsonBodyParser()).use(authorize());