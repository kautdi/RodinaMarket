import { createAsyncThunk } from '@reduxjs/toolkit';
import CompanyService from '../../service/CompanyService';
import UserService from '../../service/UserService';
import { RefreshTokenCompany, RefreshTokenUser, RegistrationParams } from './types';


export const companyRegistration = createAsyncThunk(
  'auth/companyRegistration',
  async (params: RegistrationParams) => {
    try {
      const { email, password } = params;
      const authData = await CompanyService.registration(email, password);
      return authData.data;
    } catch (error) { 
      
      return error; 
    }
  }
);
export const userRegistration = createAsyncThunk(
  'auth/userRegistration',
  async (params: RegistrationParams) => {
    try {
      const { email, password } = params;
      const authData = await UserService.registration(email, password);
      return authData.data
    } catch (error) { 
      
      return error; 
    }
},
);
export const companyLogin = createAsyncThunk(
  'auth/companyLogin',
  async (params: RegistrationParams) => {
    try {
      const { email, password } = params;
      const authData = await CompanyService.login(email, password);
      return authData.data
    } catch (error) { 
      return error; 
    }
},
);
export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (params: RegistrationParams) => {
    try {
      const { email, password } = params;
      const authData = await UserService.login(email, password);
      return authData.data
    } catch (error) { 
      return error; 
    }
},
);
export const refreshTokenCompany = createAsyncThunk(
  'auth/companyRefresh',
  async (params: RefreshTokenCompany) => {
    try {
      const { idcompany, refreshToken } = params;
      const accessData = await CompanyService.refreshToken(idcompany!, refreshToken); // Use optional chaining or nullish coalescing to handle idcompany
      return accessData.data;
    } catch (error) { 
      return error; 
    }
  }
);

export const refreshTokenUser = createAsyncThunk(
  'auth/userRefresh',
  async (params: RefreshTokenUser) => {
    try {
      const { idUser, refreshToken } = params;
      const accessData = await UserService.refreshToken(idUser, refreshToken);
      return accessData.data;
    } catch (error) { 
      return error; 
    }
  }
);