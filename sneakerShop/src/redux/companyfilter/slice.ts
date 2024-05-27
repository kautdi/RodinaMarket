import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyFilterSliceState } from './types';

import { ISneaker } from '../../models/ISneaker';



const initialState: CompanyFilterSliceState = {
    search: '',
    brands:0 ,
    idcompany: 0,
  };

  const companyfilterSlice = createSlice({
    name: 'companyfilter',
    initialState,
    reducers: {
      setSearchValue(state, action: PayloadAction<string>) {
        state.search = action.payload;
        console.log(state.search);
      },
      setIdCompanys(state, action: PayloadAction<number>) {
        state.idcompany = action.payload;
      },
      setBrands(state, action: PayloadAction<number>) {
        state.brands = action.payload;
      },

    },
});
  
  export const {setSearchValue,setIdCompanys,setBrands} = companyfilterSlice.actions;
  
  export default companyfilterSlice.reducer;
  