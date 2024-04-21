import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const CreateProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Your Journey</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E4E2',
    width:'100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#FEBE10',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CreateProfileScreen;
