const BASE_URL = 'https://nf-api.onrender.com/';
import { getUserNameInLocalStorage } from '../helpers/localStorage';

const REGISTER_USER_ENDPOINT = BASE_URL + 'api/v1/social/auth/register';
const LOGIN_USER_ENDPOINT = BASE_URL + 'api/v1/social/auth/login';
const CREATE_POST_ENDPOINT = BASE_URL + 'api/v1/social/posts';
const GET_POSTS_ENDPOINT =
  BASE_URL +
  'api/v1/social/posts/?_author=true&_comments=true&_reactions=true&&?sort=created&sortOrder=desc';
const GET_LOGGED_IN_USER_POSTS_ENDPOINT =
  BASE_URL +
  `api/v1/social/profiles/${getUserNameInLocalStorage()}?_posts=true&_comments=true`;
const DELETE_POSTS_BY_ID_ENDPOINT = BASE_URL + 'api/v1/social/posts';
const GET_POST_BY_ID_ENDPOINT = BASE_URL + 'api/v1/social/posts';

export {
  BASE_URL,
  REGISTER_USER_ENDPOINT,
  LOGIN_USER_ENDPOINT,
  CREATE_POST_ENDPOINT,
  GET_POSTS_ENDPOINT,
  GET_LOGGED_IN_USER_POSTS_ENDPOINT,
  DELETE_POSTS_BY_ID_ENDPOINT,
  GET_POST_BY_ID_ENDPOINT,
};
