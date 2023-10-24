import middy from '@middy/core';
import { db } from '../../services/db.js';
import { sendResponse } from '../../responses';

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
    const meetupInfo = meetups.map((meetup) => {
      return { time: meetup.time, location: meetup.location, description: meetup.description }; //! Lägg till värd sen
    });

    return sendResponse(200, {
      success: true,
      result: meetups.length,
      meetups: meetupInfo,
    });
  } catch (error) {
    return sendResponse(400, {
      success: false,
    });
  }
}

export const handler = middy(lambda);
