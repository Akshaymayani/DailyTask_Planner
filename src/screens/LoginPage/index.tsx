/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AsyncStorage, NavigationPath } from '../../constant/Storage';
import { GetAsyncData, SetAsyncData } from '../../AsyncStorage/ManipulateStorage';
import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../Redux/Store';
import { User, loginUser, userList } from '../../Redux/Features/usersSlice';

import CustomButton from '../../component/CustomButton';
import FormInput from '../../component/FormInput';
import { LoginNavigationProp } from '../../types/NavigationTypes';
import { useForm } from 'react-hook-form';

interface Props{
  navigation: LoginNavigationProp
}
const LoginPage = ({navigation}:Props) => {

  const allUserList = useAppSelector((store: RootState) => store.userInfo.userList);
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log({allUserList});
    const storedUser: User | undefined = allUserList.find(u => u.email === data.email);
    console.log({data});
    console.log({storedUser});
    if(!storedUser){
      Alert.alert('Login Failed','User not found');
    }
    else if(storedUser.password !== data.password){
      Alert.alert('Login Failed','Invalid Password');
    }else{
      await SetAsyncData(AsyncStorage.SESSION_INFO, JSON.stringify(storedUser));
      dispatch(loginUser(storedUser));
      navigation.navigate(NavigationPath.Dashboard);
    }
  };

  useEffect(()=>{
    (async () =>{
      const userInfo = await GetAsyncData(AsyncStorage.USER_INFO);
      if(userInfo){
        dispatch(userList(userInfo));
      }
    })();
  },[]);

  return (
    <ImageBackground
    source={require('../../assets/AuthenticationBg.jpg')}
    alt="Bakckground Image"
    style={styles.imageContainer}
    >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formWrapper}>
          <Image
            source={require('../../assets/Authentication.jpg')}
            style={styles.image}
          />

          {/* <Text style={styles.title}>Login</Text> */}

          <View style={styles.inputContainer}>
            <FormInput
              control={control}
              name="email"
              label="Email"
              icon="mail"
              keyboardType="email-address"
              rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } }}
            />
            <FormInput
              control={control}
              name="password"
              label="Password"
              icon="lock-closed-outline"
              secureTextEntry
              rules={{ required: 'Password is required' }}
            />

            <CustomButton title="Login" onPress={handleSubmit(onSubmit)} />
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.replace('Register')}>
                <Text style={styles.footerLink}> Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  imageContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255,0.5)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  formWrapper: {
    minHeight: '100%',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // backgroundColor: '#fff',
  },
  image: {
    height: 250,
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    gap:2,
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  footerLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
