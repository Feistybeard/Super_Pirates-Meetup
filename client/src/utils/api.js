const URL = `${import.meta.env.VITE_BASE_URL}`;

export async function getMeetups() {
  try {
    const response = await fetch(URL, {
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
