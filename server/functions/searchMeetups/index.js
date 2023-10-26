import middy from '@middy/core';
import { sendResponse } from '../../responses';
import { getMeetups } from '../getMeetups/index.js';

async function getMeetupsByQuery(queryStr) {
  const words = queryStr.split(' ');
  const meetups = await getMeetups();
  const findMatch = meetups.filter((meetup) => {
    for (const word of words) {
      if (meetup.keywords.includes(word)) {
        return meetup;
      }
    }
  });
  return findMatch;
}

async function lambda(event) {
  try {
    const { query } = event.queryStringParameters;
    const searchResult = await getMeetupsByQuery(query);
    return sendResponse(200, {
      success: true,
      event,
      query,
      searchResult,
    });
  } catch (error) {
    return sendResponse(400, {
      success: false,
    });
  }
}

export const handler = middy(lambda);
