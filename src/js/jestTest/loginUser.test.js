import logInUser from '../helpers/logInUser';

const MOK_USERDATA = {
  email: 'emil@noroff.no',
  password: 'p4pp4123',
};

const MOK_API_URL = '';

const MOK_RESPONSE = {
  name: 'rakira',
  email: 'emil@noroff.no',
  banner:
    'https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  avatar: null,
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYwLCJuYW1lIjoicmFraXJhIiwiZW1haWwiOiJlbWlsQG5vcm9mZi5ubyIsImF2YXRhciI6IiIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjY0NTc1NjAwNzk2LWZmYTgyOGM1Y2I2ZT9peGxpYj1yYi00LjAuMyZpeGlkPU1ud3hNakEzZkRGOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTE3MCZxPTgwIiwiaWF0IjoxNjY3OTk2OTAxfQ.KQRT7diKGNudDibPwUcnf6tckTQXefcKmF5BCBAF23Y',
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOK_RESPONSE),
  }),
);

test('log in user with credentials', async () => {
  const response = await logInUser(MOK_API_URL, MOK_USERDATA);

  const userAccessToken = response.accessToken;

  expect(userAccessToken).not.toBeNull();
});
