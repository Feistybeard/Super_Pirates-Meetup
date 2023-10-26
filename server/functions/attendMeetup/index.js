import middy from '@middy/core';
import dayjs from 'dayjs';

import { db } from '../../services/db.js';
import { sendResponse } from '../../responses';
import { authorize } from '../../middleware/index.js';

import { getMeetupById } from './helpers.js';

async function lambda(event, context) {
  const userId = event.auth.id;
  const { meetupId } = event.pathParameters;

  try {
    const meetup = await getMeetupById(meetupId);

    if (!meetup) {
      return sendResponse(404, {
        success: false,
        message: `No meet-up with the id: '${meetupId}' exists`,
      });
    }

    const meetupHasNotBeen = dayjs().isBefore(meetup.time);

    if (!meetupHasNotBeen) {
      return sendResponse(400, {
        success: false,
        message: `Cannot sign up for a meet-up that has already taken place`,
      });
    }

    const userSignedUp = meetup.attendees.includes(userId);

    if (!meetup.spotsAvailable) {
      return sendResponse(400, {
        success: false,
        message: `The number of attendees cannot exceed the limit: ${meetup.limit}`,
      });
    }

    if (!userSignedUp) {
      await db
        .update({
          TableName: 'meetup',
          Key: { id: meetupId },
          UpdateExpression:
            'SET #attendees = list_append(if_not_exists(#attendees, :empty), :item), spotsAvailable = :spotsAvailable, numberOfAttendees = :numberOfAttendees',
          ExpressionAttributeNames: { '#attendees': 'attendees' },
          ExpressionAttributeValues: {
            ':item': [userId],
            ':empty': [],
            ':spotsAvailable': meetup.spotsAvailable - 1,
            ':numberOfAttendees': meetup.numberOfAttendees + 1,
          },
        })
        .promise();

      return sendResponse(200, {
        success: true,
        message: 'Successfully signed up for the meet-up',
      });
    } else {
      return sendResponse(409, {
        success: true,
        message: 'Already signed up for this meet-up',
      });
    }
  } catch (error) {
    return sendResponse(400, {
      success: false,
      message: 'Failed to sign up for the meet-up',
    });
  }
}

export const handler = middy(lambda).use(authorize());
