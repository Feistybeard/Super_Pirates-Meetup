export async function getMeetups() {
  try {
    const response = await fetch(
      `https://rh0ztvnh0m.execute-api.eu-north-1.amazonaws.com/api/meetups`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getMeetup(id) {
  try {
    const response = await fetch(
      `https://rh0ztvnh0m.execute-api.eu-north-1.amazonaws.com/api/meetups/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function submitReview(data, meetupId) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(
      `https://rh0ztvnh0m.execute-api.eu-north-1.amazonaws.com/api/meetups/reviews/${meetupId}`,
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

export async function getUserInfo() {
  const token = localStorage.getItem('token');
  const url = `https://rh0ztvnh0m.execute-api.eu-north-1.amazonaws.com/api/user/profile`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
