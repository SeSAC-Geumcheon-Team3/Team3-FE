import { atom } from 'recoil';

// 로컬 스토리지에서 상태 복원 함수
const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined; // 상태가 없을 경우 undefined 반환
    }
    return JSON.parse(serializedState); // 저장된 상태 반환
  } catch (err) {
    console.error("로컬 스토리지에서 상태를 불러오는 중 오류가 발생했습니다:", err);
    return undefined;
  }
};

// 로컬 스토리지에 상태 저장 함수
const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("로컬 스토리지에 상태를 저장하는 중 오류가 발생했습니다:", err);
  }
};

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: loadState('accessTokenState') || '', // 상태가 없을 때는 기본 값 사용
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveState('myState', newValue); // 상태 변경 시 로컬 스토리지에 저장
      });
    },
  ],
});
