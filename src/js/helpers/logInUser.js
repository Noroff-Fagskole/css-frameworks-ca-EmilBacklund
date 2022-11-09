async function logInUser(LOGIN_USER_ENDPOINT, userData) {
  const response = await fetch(LOGIN_USER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const jsonResponse = await response.json();
  if (jsonResponse.accessToken) {
    const saveUser = {
      name: jsonResponse.name,
      email: jsonResponse.email,
    };

    const loginUserData = {
      saveUser,
      accessToken: jsonResponse.accessToken,
    };
    return loginUserData;

    // window.location.href = '/index.html';
  }
  const errorMessage = `${jsonResponse.errors[0].message}`;
  throw Error(errorMessage);
}

export default logInUser;
