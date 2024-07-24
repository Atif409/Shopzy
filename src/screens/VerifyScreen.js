import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';
import CustomAlert from '../components/CustomAlert';

const VerifyScreen = ({ route }) => {
  const [otp, setOtp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (route.params && route.params.email) {
      setEmail(route.params.email);
      console.log('Email received:', route.params.email);
    } else {
      console.error('No email found in route parameters');
    }
  }, [route.params]);

  const handleChangeText = (index, value) => {
    if (value.length === 0 || (value.length === 1 && /^\d+$/.test(value))) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
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
    console.log('Verifying OTP for email:', email);
    console.log('Verification Code:', verificationCode);
    try {
      const response = await axios.post(`${API_URL}/customer/verify`, { email, verificationCode });
      console.log('Response:', response.data);
      setAlertMessage('Verification Successful');
      setShowAlert(true);
    } catch (error) {
      console.log('Error response:', error.response);
      if (error.response && error.response.status === 404) {
        setAlertMessage('Verification Failed: Resource not found');
      } else {
        setAlertMessage('Verification Failed: An unexpected error occurred');
      }
      setShowAlert(true);
    }
    setLoading(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertMessage === 'Verification Successful') {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.tagline}>Please enter the OTP sent to your email to verify your email address.</Text>
      <View style={styles.otpContainer}>
        {[...Array(6).keys()].map((index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            onChangeText={(text) => handleChangeText(index, text)}
            onKeyPress={(event) => handleKeyPress(index, event)}
            value={otp[index] || ''}
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

export default VerifyScreen;
