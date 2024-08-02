import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface UserState {
  session: User | undefined;
}

const initialState: UserState = {
  session: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.session = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;

export const selectSession = (state: RootState) => state.user.session;

export default userSlice.reducer;
