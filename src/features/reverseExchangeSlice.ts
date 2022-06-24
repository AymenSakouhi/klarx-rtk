import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface reverseExchangesState {
  value: number[];
}

const initialState: reverseExchangesState = {
  value: [],
};

export const reverseExchangesSlice = createSlice({
  name: "reverseExchanges",
  initialState,
  reducers: {
    addRateReverse: (state, action: PayloadAction<number>) => {
      state.value.push(action.payload);
    },
    clearStateReverse:(state) => { 
      state.value = []
     }
  },
});

export const { addRateReverse, clearStateReverse } = reverseExchangesSlice.actions;

export default reverseExchangesSlice.reducer;
