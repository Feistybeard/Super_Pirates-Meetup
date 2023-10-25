export async function submitReview(data, meetupId) {
  const token =
    /* temporär */
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlIwdXljY0YzRkhmb19qRkdIS3ZFTSIsImlhdCI6MTY5ODE0OTY2MywiZXhwIjoxNjk4MTUzMjYzfQ.SbZt1L-tm8hGNSyajXF7qQNe8HSKxFwKMpLHF8MpBDY';

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/meetups/reviews/${meetupId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}