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
        attendees: meetup.Item.attendees,
      });
    }

    meetup.Item.attendees = meetup.Item.attendees.filter((id) => id !== userId);

    await db
      .update({
        TableName: 'meetup',
        Key: { id: meetupId },
        UpdateExpression:
          'SET attendees = :attendees, spotsAvailable = :spotsAvailable, numberOfAttendees = :numberOfAttendees',
        ExpressionAttributeValues: {
          ':attendees': meetup.Item.attendees,
          ':spotsAvailable': meetup.Item.limit - meetup.Item.attendees.length,
          ':numberOfAttendees': meetup.Item.attendees.length,
        },
      })
      .promise();

    return sendResponse(200, {
      success: true,
      message: 'User successfully unregistred from event',
      limit: meetup.Item.limit,
      numberOfAttendees: meetup.Item.attendees.length,
      spotsAvailable: meetup.Item.limit - meetup.Item.attendees.length,
    });
  } catch (error) {
    console.log(error);
    return sendError(500, { success: false, message: error });
  }
}

export const handler = middy(unregisterFromMeetup).use(authorize());
