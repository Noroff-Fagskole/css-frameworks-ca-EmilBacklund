async function createPost(apiCreatePostUrl, token, postData) {
  const response = await fetch(apiCreatePostUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  const jsonResponse = await response.json();
  if (jsonResponse.id) {
    return true;
  }
  return false;
}

export default createPost;
