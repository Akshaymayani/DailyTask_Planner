import 'react-native-get-random-values';

import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AsyncStorage, NavigationPath } from '../../constant/Storage';
import { RootState, useAppDispatch, useAppSelector } from '../../Redux/Store';

import CustomButton from '../../component/CustomButton';
import FormInput from '../../component/FormInput';
import React from 'react';
import { RegisterNavigationProp } from '../../types/NavigationTypes';
import { SetAsyncData } from '../../AsyncStorage/ManipulateStorage';
import { addRegisterUser } from '../../Redux/Features/usersSlice';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface Props {
  navigation: RegisterNavigationProp;
}

const RegisterScreen = ({ navigation }: Props) => {
  const allUserList = useAppSelector((store: RootState) => store.userInfo.userList);
  const dispatch = useAppDispatch();
  const uniqueId = uuidv4();
  const { control, handleSubmit, getValues } = useForm<RegisterForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    const isExistUser = allUserList.find(user => user.email === data.email.toLowerCase());
    console.log(isExistUser);
    if (isExistUser) {
      Alert.alert('Email already exists');
      return;
    } else {
      const updatedDetails = {
        id: uniqueId,
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
      };
      console.log(updatedDetails);
      const updatedUser = [...allUserList, updatedDetails];
      dispatch(addRegisterUser(updatedDetails));
      await SetAsyncData(AsyncStorage.USER_INFO, updatedUser);
      navigation.navigate(NavigationPath.Login);
    }
  };

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
            <View style={styles.inputContainer}>
              <FormInput
                control={control}
                name="name"
                label="Name"
                icon="person"
                rules={{ required: 'Name is required' }}
              />
              <FormInput
                control={control}
                name="email"
                label="Email"
                icon="mail"
                keyboardType="email-address"
                rules={{
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                }}
              />
              <FormInput
                control={control}
                name="password"
                label="Password"
                icon="lock-closed-outline"
                secureTextEntry
                rules={{
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Min length is 6' },
                }}
              />
              <FormInput
                control={control}
                name="confirmPassword"
                label="Confirm Password"
                icon="lock-closed-outline"
                secureTextEntry
                rules={{
                  required: 'Confirm Password is required',
                  validate: (value: any) => value === getValues('password') || 'Passwords do not match',
                }}
              />

              <CustomButton title="Register" onPress={handleSubmit(onSubmit)} />
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                  <Text style={styles.footerLink}> Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  imageContainer: {
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
    gap: 2,
  },
  footerText: {
    fontSize: 15,
    color: '#000',
  },
  footerLink: {
    fontSize: 15,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
