import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface exchangeState {
  value: number[];
}

const initialState: exchangeState = {
  value: [],
};

export const exchangeSlice = createSlice({
  name: "exchanges",
  initialState,
  reducers: {
    addRate: (state, action: PayloadAction<number>) => {
      state.value.push(action.payload);
    },
    clearState:(state) => { 
      state.value = []
     }
  },
});

export const { addRate, clearState } = exchangeSlice.actions;

export default exchangeSlice.reducer;
