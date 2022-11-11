import clearStorage from '../helpers/clearStorage';

const MOK_KEY = 'token';
const MOK_VALUE = 'aklsdölaksödlkaölwdkqölwkdölqkwdlö';

describe('LogOut', () => {
  test('Saving a token on the local storage and clear on logout click', () => {
    localStorage.setItem(MOK_KEY, JSON.stringify(MOK_VALUE));
    clearStorage();
    const myToken = localStorage.getItem(MOK_KEY);
    expect(myToken).toBeUndefined();
  });
});
