import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState } from './types';


const initialState: FilterSliceState = {
    name: '',
    brandId: 0,
    sizes: [],
    brands: [],
    idcompanys:[],
    colors: [],
    price: 0,
  };

  const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
      setBrandId(state, action: PayloadAction<number>) {
        state.brandId = action.payload;
      },
      setSearchValue(state, action: PayloadAction<string>) {
        state.name = action.payload;
      },
      setPrice(state, action: PayloadAction<number>) {
        state.price = action.payload;
      },
      setSize(state, action: PayloadAction<number[]>) {
        state.sizes = action.payload;
      },
      setColors(state, action: PayloadAction<string[]>) {
        state.colors = action.payload;
      },
      setIdCompanys(state, action: PayloadAction<number[]>) {
        state.idcompanys = action.payload;
      },
      setBrands(state, action: PayloadAction<number[]>) {
        state.brands = action.payload;
      },
    },

  });
  
  export const {setSearchValue,setBrandId,setSize,setColors,setIdCompanys,setBrands, setPrice} = filterSlice.actions;
  
  export default filterSlice.reducer;
  