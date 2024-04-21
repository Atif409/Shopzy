import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import CustomAlert from '../components/CustomAlert';

const VerifyScreen = ({ route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { email } = route.params;

  const inputRefs = useRef([]);

  const handleChangeText = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      // Delete digit from current input field
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);

      // Move focus to the previous input field
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const verificationCode = otp.join('');
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/customer/verify`, { email, verificationCode });
      setAlertMessage('Verifcation Successful');
      setShowAlert(true);
    } catch (error) {
      console.log(error)
      setAlertMessage('Verification Failed');
      setShowAlert(true);
    }
    setLoading(false);
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
        onClose={() => setShowAlert(false)}
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
