import { expect } from 'chai';
import localstorage from '../../../localstorage';
import clearStorage from '../helpers/clearStorage';

test('logging out user', () => {
  localstorage.setItem('token', 'aklsdölaksödlkaölwdkqölwkdölqkwdlö');
  clearStorage();
  const myToken = localstorage.getItem('token');
  expect(myToken).toBeUndefined();
});
