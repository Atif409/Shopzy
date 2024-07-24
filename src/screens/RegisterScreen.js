import React, { useState } from 'react';
import { View, Image, Text, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../styles/LoginStyle';
import CustomIcon from '../components/CustomIcon';
import axios from "axios";
import { API_URL } from '@env';
import CustomAlert from '../components/CustomAlert';

const RegisterScreen = () => {
  const { container, tagline, mainLoginBox, loginBox, subContainer, inputs, icon, touchable, btnLogin, btnText, logo, noAccout, divider, line, buttonText, socialContainer, socialButton, socialIcon } = styles;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      setAlertMessage('Please fill in all fields');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      setShowAlert(true);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setAlertMessage('Please enter a valid email address');
      setShowAlert(true);
      return;
    }

    if (password.length < 6) {
      setAlertMessage('Password must be at least 6 characters long');
      setShowAlert(true);
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setAlertMessage('Password must contain at least one letter and one number');
      setShowAlert(true);
      return;
    }

    setLoading(true);

    const user = { name, email, password };

    axios.post(`${API_URL}/customer/register`, user).then((response) => {
      setAlertMessage('Please Verify Your Email');
      setShowAlert(true);
    }).catch((error) => {
      console.log(error.response.status, error.response.data.message);
      if (error.response && error.response.status === 400 && error.response.data.message === 'Email already registered') {
        setAlertMessage('Email Already Registered');
      } else {
        setAlertMessage('Registration Failed');
      }
      setShowAlert(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertMessage === 'Please Verify Your Email') {
      navigation.navigate('VerifyScreen', { email });
    }
  };

  return (
    <SafeAreaView style={container}>
      <View>
        <Image source={require('../../assets/logo/logo.png')} style={logo} />
      </View>
      <KeyboardAvoidingView>
        <View style={subContainer}>
          <Text style={tagline}>Register To Your Account</Text>
        </View>
        <View style={mainLoginBox}>
          <View style={loginBox}>
            <CustomIcon name="person" style={icon} />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder='Enter your name'
              style={inputs}
            />
          </View>
          <View style={loginBox}>
            <CustomIcon name="email" style={icon} />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder='Enter your email'
              style={inputs}
            />
          </View>
          <View style={loginBox}>
            <CustomIcon name="lock" style={icon} />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder='Enter your password'
              style={inputs}
              secureTextEntry
            />
          </View>
          <View style={loginBox}>
            <CustomIcon name="lock" style={icon} />
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder='Confirm your password'
              style={inputs}
              secureTextEntry
            />
          </View>
          <View style={touchable}>
            <Text></Text>
            <Text style={{ color: 'blue', fontWeight: '500' }}></Text>
          </View>
          <View style={{ marginTop: 20 }} />
          <Pressable style={[btnLogin, loading && { backgroundColor: '#ccc' }]} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={btnText}>Register</Text>
            )}
          </Pressable>
          <CustomAlert
            visible={showAlert}
            message={alertMessage}
            onClose={handleAlertClose}
          />
          <Pressable style={{ marginTop: 15 }} onPress={() => { navigation.navigate("Login") }}>
            <Text style={noAccout}>Already have an account? Sign In</Text>
          </Pressable>
          {/* <View style={divider}>
            <View style={line} />
            <Text style={buttonText}>Or Sign up with</Text>
            <View style={line} />
          </View>
          <View style={socialContainer}>
            <TouchableOpacity onPress={() => console.log("Facebook Pressed")} style={socialButton}>
              <Image source={require("../../assets/icons/facebook.png")} style={socialIcon} resizeMode='contain' />
              <Text>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Google Pressed")} style={socialButton}>
              <Image source={require("../../assets/icons/google.png")} style={socialIcon} resizeMode='contain' />
              <Text>Google</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterScreen;
