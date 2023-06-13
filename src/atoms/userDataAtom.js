import {atom} from 'recoil';

export const userDataAtom = atom({
  key: 'userDataAtom',
  default: {
    name: '',
  },
});
