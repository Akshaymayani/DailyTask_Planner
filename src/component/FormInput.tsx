import Animated, { BounceInLeft, FadeOut, Layout } from 'react-native-reanimated';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import React from 'react';

const FormInput = ({ control, name, rules = {}, label, icon, ...props }: any) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <View style={[styles.inputContainer, error && styles.inputError]}>
              {icon && <Ionicons name={icon} size={20} color="#555" style={styles.icon} />}
              <TextInput
                style={styles.input}
                placeholder={label}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#888"
                {...props}
              />
            </View>
            {error && (
                 <Animated.View
                 entering={BounceInLeft}
                 exiting={FadeOut}
                 layout={Layout.duration(0)}>
                 <Text
                   style={styles.errorText}>
                   {error.message || 'Error'}
                 </Text>
               </Animated.View>
            )}
          </>
        )}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 1 : 12,
    borderWidth:0.6,
    borderColor:'grey',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
});
