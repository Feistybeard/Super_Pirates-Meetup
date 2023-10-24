import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

import { db } from '../../services/db.js';
import { sendResponse } from '../../responses';
import { authorize, validateSchema } from '../../middleware/index.js';
import { addReviewSchema } from '../../validations/index.js';

import { getUsersMeetupsByUserId, hasUserParticipated, getReviewsByMeetupId } from './helpers.js';

async function lambda(event, context) {
  try {
    const review = event.body;
    const userId = event.auth.id;
    const { meetupId } = event.pathParameters;

    const meetups = await getUsersMeetupsByUserId(userId);
    const [meetup] = meetups.filter((meetup) => meetup.id === meetupId);

    if (!hasUserParticipated(meetups, meetupId)) {
      return sendResponse(400, {
        success: false,
        message: `Cannot leave a review on a meet-up that the user didn't attend`,
      });
    }

    const meetupHasBeen = dayjs().isAfter(meetup.time);

    if (!meetupHasBeen) {
      return sendResponse(400, {
        success: false,
        message: `Cannot leave a review on a meet-up that hasn't started yet`,
      });
    }

    const meetupReviews = await getReviewsByMeetupId(meetupId);
    const isNotDuplicateReview = !meetupReviews.filter((review) => review.userId === userId).length;

    if (isNotDuplicateReview) {
      await db
        .update({
          TableName: 'meetup',
          Key: { id: meetupId },
          UpdateExpression: 'SET #reviews = list_append(if_not_exists(#reviews, :empty), :item)',
          ExpressionAttributeNames: { '#reviews': 'reviews' },
          ExpressionAttributeValues: {
            ':item': [
              {
                id: nanoid(),
                userId,
                ...review,
              },
            ],
            ':empty': [],
          },
        })
        .promise();

      return sendResponse(201, {
        success: true,
        message: 'Review successfully added',
      });
    } else {
      return sendResponse(409, {
        success: true,
        message: `Cannot leave multiple reviews on a meet-up`,
      });
    }
  } catch (error) {
    return sendResponse(400, {
      success: false,
      message: 'Failed to add review',
      error: error.message,
    });
  }
}

export const handler = middy(lambda)
  .use(jsonBodyParser())
  .use(authorize())
  .use(validateSchema(addReviewSchema));
