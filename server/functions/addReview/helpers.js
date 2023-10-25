import { db } from '../../services/db.js';

export async function getUsersMeetupsByUserId(userId) {
  const { Items: meetups } = await db
    .scan({
      TableName: 'meetup',
      FilterExpression: 'contains (attendees, :userId)',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    })
    .promise();

  return meetups;
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
