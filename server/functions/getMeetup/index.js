import middy from '@middy/core';

import { sendResponse } from '../../responses';

import { getMeetupById, resolveAttendees, resolveReviews } from './helpers.js';

async function lambda(event, context) {
  const { meetupId } = event.pathParameters;
  try {
    const meetup = await getMeetupById(meetupId);

    return sendResponse(200, {
      success: true,
      data: {
        ...meetup,
        attendees: await resolveAttendees(meetup),
        reviews: await resolveReviews(meetup),
      },
    });
  } catch (error) {
    return sendResponse(400, {
      success: false,
      message: `Failed to get details of the meet-up by id: ${meetupId}`,
    });
  }
}

export const handler = middy(lambda);
