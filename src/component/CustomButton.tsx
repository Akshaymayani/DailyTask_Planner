import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import React from 'react';

interface Props{
  title: string;
  onPress: () => void
}

const CustomButton = ({ title, onPress }:Props ) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.5}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
