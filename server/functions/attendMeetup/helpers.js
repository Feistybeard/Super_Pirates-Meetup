import { db } from '../../services/db.js';

export async function getMeetupById(meetupId) {
  const { Item: meetup } = await db
    .get({
      TableName: 'meetup',
      Key: { id: meetupId },
    })
    .promise();

  return meetup;
}

export async function getUserById(userId) {
  const { Item: user } = await db
    .get({
      TableName: 'users',
      Key: { id: userId },
    })
    .promise();

  return user;
}
