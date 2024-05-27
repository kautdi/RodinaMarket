import { createAsyncThunk } from '@reduxjs/toolkit';
import TovarsService from '../../service/TovarsService';
import { Categories } from './types';

export const fetchBrands = createAsyncThunk<Categories[]>(
  'sneaker/fetchBrands',
  async () => {
    const { data } = await TovarsService.getBrands();
    console.log(data)
    return data;
  },
);
