import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import CustomAlert from '../components/CustomAlert';
import { useNavigation } from '@react-navigation/native';

const VerifySeller = ({ route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { email } = route.params;
  const navigation = useNavigation();

  const inputRefs = useRef([]);

  const handleChangeText = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const verificationCode = otp.join('');
    setLoading(true);
    console.log('Verify API Link is:', `${API_URL}/seller/verify`);
    console.log('Email:', email, 'Verification Code:', verificationCode);
    try {
      console.log('Sending verification request to:', `${API_URL}/seller/verify`);
      const response = await axios.post(`${API_URL}/seller/verify`, { email, verificationCode });
      console.log('Verification response:', response.data);
  
      setAlertMessage('Verification Successful');
      setShowAlert(true);
    } catch (error) {
      console.error('Error during verification:', error);
  
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
  
        if (error.response.status === 404) {
          setAlertMessage('Verification Failed: Invalid email or verification code');
        } else {
          setAlertMessage(`Verification Failed: ${error.response.data.message || 'An unexpected error occurred'}`);
        }
      } else if (error.request) {
        console.error('Request data:', error.request);
        setAlertMessage('Verification Failed: No response from server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        setAlertMessage('Verification Failed: An unexpected error occurred');
      }
  
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertMessage === 'Verification Successful') {
      navigation.navigate('LoginSeller');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.tagline}>Please enter the OTP sent to your email to verify your email address.</Text>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            onChangeText={(text) => handleChangeText(index, text)}
            onKeyPress={(event) => handleKeyPress(index, event)}
            value={value}
            maxLength={1}
            keyboardType="numeric"
            autoFocus={index === 0}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyButtonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
      <CustomAlert
        visible={showAlert}
        message={alertMessage}
        onClose={handleAlertClose}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E4E2',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    marginBottom: 25,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 20,
    borderRadius: 4,
  },
  verifyButton: {
    backgroundColor: '#FF7F00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerifySeller;
