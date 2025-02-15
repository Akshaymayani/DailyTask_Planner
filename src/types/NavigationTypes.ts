// types/navigation.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Dashboard: undefined; // No parameters for Dashboard
  Login: undefined; // No parameters for Login
  Register: undefined; // No parameters for Register
};

export type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
export type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export type DashboardRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;
export type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type RegisterRouteProp = RouteProp<RootStackParamList, 'Register'>;
