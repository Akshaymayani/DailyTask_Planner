import { useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit'
import userReducer  from './Features/usersSlice';

export const Store = configureStore({
  reducer: {
    userInfo:userReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>
export const useAppSelector = useSelector.withTypes();
export const useAppDispatch = useDispatch.withTypes();
