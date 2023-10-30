export async function getMeetups() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}meetups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}meetups/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}meetups/reviews/${meetupId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo() {
  const token = localStorage.getItem('token');
  const url = import.meta.env.VITE_BASE_URL + 'user/profile';

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
