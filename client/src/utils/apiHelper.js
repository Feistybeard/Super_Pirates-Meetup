const awsLink = 'https://khbmhn1wfe.execute-api.eu-north-1.amazonaws.com/api';

export async function submitToApi(data, method, link) {
  try {
    const response = await fetch(awsLink + link, {
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
