import { createSlice } from '@reduxjs/toolkit';

export interface User{
    id: string;
    name: string;
    email: string;
    password: string;
}
export interface CounterState {
  userList:User[] ,
  currentUser:User|{},
}

const initialState: CounterState = {
  userList:[],
  currentUser:{},
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    userList :(state, action)=>{
      state.userList = [...state.userList ,...action.payload];
    },
    registerUser: (state,action) => {
      state.userList = [...state.userList , action.payload];
    },
    loginUser: (state,action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = {};
    },
    addRegisterUser : (state,action)=>{
      state.userList = [...state.userList , action.payload];
    }
  },
})

// Action creators are generated for each case reducer function
export const { registerUser, loginUser, logoutUser,userList,addRegisterUser } = userSlice.actions;

export default userSlice.reducer;