import { ActivityIndicator, Dimensions } from 'react-native';
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text } from 'react-native';

import React from 'react';
import { View } from 'react-native';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('screen');
const CustomActivityIndicator = ({
    IsLoading,
    LoadingText,
  }: {
    IsLoading: boolean;
    LoadingText?: string;
  }) => {
    return IsLoading ? (
      <View
        style={styles.container}>
        <ActivityIndicator size={'large'} animating={IsLoading} color="#fff" />
        <Text
          style={styles.errorText}>
          {' '}
          {LoadingText ? LoadingText : ''}
        </Text>
      </View>
    ) : (
      <></>
    );
  };

  export default CustomActivityIndicator;

  const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width: ScreenWidth,
        height: ScreenHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 5000,
    },
    errorText:{
        fontWeight: 'bold',
        fontSize: 20,
    }
  })
