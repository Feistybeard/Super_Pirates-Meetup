import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { nanoid } from 'nanoid';

import { db } from '../../services/db.js';
import { sendResponse } from '../../responses';
import { validateSchema } from '../../middleware/index.js';
import { createMeetupSchema } from '../../validations/index.js';

async function lambda(event, context) {
  try {
    const meetup = event.body;

    await db
      .put({
        TableName: 'meetup',
        Item: {
          id: nanoid(),
          ...meetup,
          attendees: [],
          reviews: [],
          spotsAvailable: meetup.limit,
          numberOfAttendees: 0,
        },
      })
      .promise();

    return sendResponse(201, {
      success: true,
      message: 'Meetup successfully created',
    });
  } catch (error) {
    console.log(error)
    return sendResponse(400, {
      success: false,
      message: 'Failed to create meetup'
    });
  }
}

export const handler = middy(lambda).use(jsonBodyParser()).use(validateSchema(createMeetupSchema));
