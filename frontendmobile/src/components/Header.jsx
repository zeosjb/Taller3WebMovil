import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { logOut }= useContext(AuthContext);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Mobile Hub</Text>
      <TouchableOpacity onPress={logOut} style={styles.logoutButton}>
        <Icon name="exit-outline" color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 5,
  },
});

export default Header;
