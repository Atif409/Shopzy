import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import RegisterSeller from '../sellerScreens/RegisterSeller';

export const CreateProfileScreen = () => {
  const navigation = useNavigation();
  return (

    <View style={styles.bg}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Start Your Journey</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate('Login')
        }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate('Register')
        }}>
          <Text style={styles.buttonText} >Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.lineText}>Or continue as a</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            navigation.navigate('RegisterSeller')
          }}>
          <Text style={styles.buttonText}
          >Seller</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    backgroundColor: '#E5E4E2',

  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: 35
  },
  logo: {
    width: 150,
    height: 150
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#FF7F00',
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 17,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'grey',
    marginHorizontal: 10,
  },
  lineText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',

  },
});

export default CreateProfileScreen;
