import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Storage } from '../../utils/storage';
import { User } from '../types';

interface State {
  user: User | null;
}

const initialState: State = {
  user: null
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state: any, action: PayloadAction<User>) => {
      Storage.save('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout: (state: any, action: PayloadAction<void>) => {
      Storage.remove('user');
      state.user = null;
    }
  }
});
