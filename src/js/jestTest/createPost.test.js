import createPost from '../helpers/createPost';

const MOK_TOKEN = 'vwdqkpvqowvdqimwopeviqowdkqopwvdmop';

const MOK_POST_DATA = {
  title: 'I am a jest test title of this post',
  body: 'I am a jest test body of this post',
};

const MOK_API_URL = 'https://nf-api.onrender.com/api/v1/social/posts';

const MOK_RESPONSE = {
  id: 37,
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOK_RESPONSE),
  }),
);

test('create post function', async () => {
  const response = await createPost(MOK_API_URL, MOK_TOKEN, MOK_POST_DATA);
  expect(response).toBeTruthy();
});
