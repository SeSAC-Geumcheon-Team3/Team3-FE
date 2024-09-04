import { atom } from 'recoil';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: null, // 초기 값
});