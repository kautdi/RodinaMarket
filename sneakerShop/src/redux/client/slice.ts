import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from './types';
import { userInformation } from './asyncAction';
import { set } from 'react-hook-form';



const initialState: UserData = {
  iduser: 0,
  firstname: "",
  lastname: "",
  email: "",
  country: "",
  city: "",
  street: "",
  home: ""
};

const authSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstname = action.payload;
    },
    setLastname(state, action: PayloadAction<string>) {
      state.lastname = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setStreet(state, action: PayloadAction<string>) {
      state.street = action.payload;
    },
    setHome(state, action: PayloadAction<string>) {
      state.home = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
  .addCase(userInformation.pending, (state) => {
  })
  .addCase(userInformation.fulfilled, (state, action:PayloadAction<UserData>) => {
    state.iduser = action.payload.iduser;
    state.firstname = action.payload.firstname;
    state.lastname = action.payload.lastname;
    state.email = action.payload.email;
    state.country = action.payload.country;
    state.city = action.payload.city;
    state.street = action.payload.street;
    state.home = action.payload.home;
  })
  },
});

export default authSlice.reducer;