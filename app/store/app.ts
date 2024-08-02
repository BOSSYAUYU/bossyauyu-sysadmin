import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface AppState {
  childrenRoute: Array<string>;
  customer?: Customer;
}

const initialState: AppState = {
  childrenRoute: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    pushRoute: (state, action: PayloadAction<string>) => {
      state.childrenRoute.push(action.payload);
    },
    popRoute: (state) => {
      state.childrenRoute.pop();
    },
    setCustomer: (state, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
    },
  },
});

export const { pushRoute, popRoute, setCustomer } = appSlice.actions;

export const selectChildrenRoute = (state: RootState) =>
  state.app.childrenRoute;
export const selectCustomer = (state: RootState) => state.app.customer;

export default appSlice.reducer;
