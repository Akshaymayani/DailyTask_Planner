import { AsyncStorage, NavigationPath } from '../constant/Storage';
import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../Redux/Store';

import Dashboard from '../screens/Dashboard';
import { GetAsyncData } from '../AsyncStorage/ManipulateStorage';
import LoginPage from '../screens/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import RegisterPage from '../screens/RegisterPage';
import { RootStackParamList } from '../types/NavigationTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { loginUser } from '../Redux/Features/usersSlice';

const MainRoutes = () => {
const Stack = createNativeStackNavigator<RootStackParamList>();
const isLoggedIn = useAppSelector((store: RootState) => store.userInfo.currentUser);
console.log(isLoggedIn);
const [loading, setLoading] = useState(true);
const dispatch = useAppDispatch();
useEffect(() => {
  (async ()=>{
    const result = await GetAsyncData(AsyncStorage.SESSION_INFO);
    if(result){
      dispatch(loginUser(typeof result === 'string' ? JSON.parse(result) : result));
    }
    setLoading(false);
  })();
}, [dispatch]);
if(loading) {
  return null;
}
   return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          Object.keys(isLoggedIn).length > 0 ? (
            <Stack.Screen
              name={NavigationPath.Dashboard}
              component={Dashboard}
              options={{
                headerShown:false,
              }}
            />
          ) : (
            <>
            <Stack.Screen
              name={NavigationPath.Login}
              component={LoginPage}
            />
            <Stack.Screen
            name={NavigationPath.Register}
            component={RegisterPage}
            />
            </>
          )
        }
      </Stack.Navigator>
      </NavigationContainer>
    );
};

export default MainRoutes;
