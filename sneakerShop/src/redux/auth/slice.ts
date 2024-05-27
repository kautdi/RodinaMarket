import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData, RefreshTokenData } from './types';
import { 
  companyLogin, 
  companyRegistration, 
  refreshTokenCompany, 
  refreshTokenUser, 
  userLogin, 
  userRegistration 
} from './asyncAction';

// Общая функция для обновления данных авторизации
const updateAuthData = (state: AuthData, payload: AuthData | RefreshTokenData) => {
  if ('iduser' in payload) {
    const authPayload = payload as AuthData;
    state.iduser = authPayload.iduser ?? state.iduser;
    state.idcompany = authPayload.idcompany ?? state.idcompany;
    state.email = authPayload.email ?? state.email;
    state.accessToken = authPayload.accessToken ?? state.accessToken;
    state.refreshToken = authPayload.refreshToken ?? state.refreshToken;
    localStorage.setItem('accessToken', state.accessToken);
    localStorage.setItem('refreshToken', state.refreshToken);
    localStorage.setItem('iduser', `${state.iduser}`);
    localStorage.setItem('idcompany', `${state.idcompany}`);
  } else {
    const refreshTokenPayload = payload as RefreshTokenData;
    state.idcompany = refreshTokenPayload.idcompany ?? state.idcompany;
    state.iduser = refreshTokenPayload.iduser ?? state.iduser;
    state.email = refreshTokenPayload.email ?? state.email;
    state.accessToken = refreshTokenPayload.accessToken ?? state.accessToken;
    state.refreshToken = refreshTokenPayload.refreshToken ?? state.refreshToken;
    localStorage.setItem('accessToken', state.accessToken);
    localStorage.setItem('refreshToken', state.refreshToken);
    localStorage.setItem('iduser', `${state.iduser}`);
    localStorage.setItem('idcompany', `${state.idcompany}`);
  }

  state.isAuth = true;

  console.log(state.iduser,state.idcompany,state.email,state.role,state.accessToken , state.refreshToken)
  console.log(state.accessToken , state.refreshToken)
  localStorage.setItem('accessToken', state.accessToken);
  localStorage.setItem('refreshToken', state.refreshToken);
  localStorage.setItem('iduser', `${state.iduser}`);
  localStorage.setItem('idcompany', `${state.idcompany}`);
};

const initialState: AuthData = {
  iduser: 0,
  idcompany : 0,
  email: '',
  accessToken: '',
  refreshToken: '',
  role: 'notAuthUser',
  isAuth: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(companyRegistration.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(companyRegistration.fulfilled, (state, action) => {
        updateAuthData(state, action.payload as AuthData);
        state.role = "company"
        localStorage.setItem('role', state.role);
      })
      .addCase(companyLogin.pending, (state) => {
        state.isAuth = false;
        
      })
      .addCase(companyLogin.fulfilled, (state, action) => {
        updateAuthData(state, action.payload as AuthData);
        state.role = "company"
        localStorage.setItem('role', state.role);
      })
      .addCase(userLogin.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        updateAuthData(state, action.payload as AuthData);
        state.role = "client"
        localStorage.setItem('role', state.role);
      })
      .addCase(userRegistration.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        updateAuthData(state, action.payload as AuthData);
        state.role = "client"
        localStorage.setItem('role', state.role);
      })
      .addCase(refreshTokenCompany.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(refreshTokenCompany.fulfilled, (state, action) => {
        updateAuthData(state, action.payload as RefreshTokenData);
        state.role = "company"
        localStorage.setItem('role', state.role);
      })
      .addCase(refreshTokenUser.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(refreshTokenUser.fulfilled, (state, action) => {
        updateAuthData(state, action.payload as RefreshTokenData);
        state.role = "client"
        localStorage.setItem('role', state.role);
      });
  },
});
export const {setAuth} = authSlice.actions;
export default authSlice.reducer;