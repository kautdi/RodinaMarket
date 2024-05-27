import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../service/UserService';

export const userInformation = createAsyncThunk(
  'client/userInfo',
  async (iduser:number) => {
    try {
      const userData = await UserService.getOneuser(iduser);
      return userData.data
    } catch (error) { 
      return error; 
    }
  }
);