import { db } from '../../services/db.js';

export async function getUsersMeetupsByUserId(userId) {
  const {
    Item: { meetups },
  } = await db
    .get({
      TableName: 'users',
      Key: { id: userId },
    })
    .promise();

  return await Promise.all(
    meetups.map(async (meetupId) => {
      const { Item: meetup } = await db
        .get({
          TableName: 'meetup',
          Key: { id: meetupId },
        })
        .promise();

      return meetup;
    }),
  );
}

export function hasUserParticipated(meetups, meetupId) {
  return !!meetups.filter((meetup) => meetup.id === meetupId).length;
}

export async function getReviewsByMeetupId(meetupId) {
  const {
    Item: { reviews },
  } = await db
    .get({
      TableName: 'meetup',
      Key: { id: meetupId },
    })
    .promise();

  return reviews;
}
