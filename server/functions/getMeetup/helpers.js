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

export async function resolveAttendees(meetup) {
  const attendees = await Promise.all(
    meetup.attendees.map(async (userId) => await getUserById(userId)),
  );

  return attendees.map((attendee) => ({
    id: attendee.id,
    username: attendee.username,
  }));
}

export async function resolveReviews(meetup) {
  return await Promise.all(
    meetup.reviews.map(async (review) => {
      const user = await getUserById(review.userId);

      return {
        id: review.id,
        username: user.username,
        comment: review.comment,
        score: review.score,
      };
    }),
  );
}
