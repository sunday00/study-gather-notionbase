import {atom} from "recoil";

export const recoilLogged = atom({
  key: 'LOGGED',
  default: true,
})

export const recoilName = atom({
  key: 'NAME',
  default: '',
})

export const recoilUserId = atom({
  key: 'USERID',
  default: '',
})