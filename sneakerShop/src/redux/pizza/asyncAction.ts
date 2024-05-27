import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { ISneaker } from '../../models/ISneaker';
import $api, { TOVARS_URL } from '../../http';
import TovarsService from '../../service/TovarsService';
import { FilterSliceState } from '../filter/types';

export const fetchSneakers = createAsyncThunk<ISneaker[], FilterSliceState>(
  'sneakers/fetchSneakers',
  async (params) => {
    const {sizes, brands, price, idcompanys } = params;
    const { data } = await TovarsService.getSneakers(sizes, brands, idcompanys, [], "", price);
    console.log(data)
    return data;
  },
);
