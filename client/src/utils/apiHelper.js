export async function submitToApi(data, method, link) {
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + link, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('RESULT:', result);
    return result;
  } catch (error) {
    console.log(error);
  }
}