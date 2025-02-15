import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

interface Props {
  title: string;
  onLogout: () => void;
}
const CustomHeader = ({ title, onLogout }:Props) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '',
    paddingHorizontal: 15,
    paddingTop: 10,
    borderBottomWidth:0.7,
    borderBottomColor:"grey",
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    top: 18,
    backgroundColor: 'crimson',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical:8,
  },
  logoutText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomHeader;
