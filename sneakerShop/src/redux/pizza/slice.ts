import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchSneakers} from './asyncAction'
import { ISneaker } from '../../models/ISneaker';

export interface SneakerSliceState {
    sneakers: ISneaker[];
  }
  
const initialState: SneakerSliceState = {
  sneakers: [],
};

const sneakerSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ISneaker[]>) {
      state.sneakers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.pending, (state) => {
      state.sneakers = [];
    });
    builder.addCase(fetchSneakers.fulfilled, (state, action) => {
      state.sneakers = action.payload;
    });
    builder.addCase(fetchSneakers.rejected, (state) => {
      state.sneakers = [];
    });
  },
  
});

export const { setItems } = sneakerSlice.actions;

export default sneakerSlice.reducer;
