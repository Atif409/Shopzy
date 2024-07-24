import React, { useState } from 'react';
import { View, Image, Text, KeyboardAvoidingView, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/LoginStyle';
import CustomIcon from '../components/CustomIcon';
import axios from 'axios';
import { API_URL } from '@env';
import CustomAlert from '../components/CustomAlert';
import { Picker } from '@react-native-picker/picker';

const RegisterSeller = () => {
  const {
    container,
    tagline,
    mainLoginBox,
    loginBox,
    subContainer,
    inputs,
    icon,
    touchable,
    btnLogin,
    btnText,
    logo,
    noAccout,
    divider,
    line,
    buttonText,
    socialContainer,
    socialButton,
    socialIcon,
    cat
  } = styles;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [category, setCategory] = useState(''); // New state for category
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !category) { 
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

    const user = { name, email, password, category }; 
    console.log('Register Api Link is:', `${API_URL}/seller/register`); 

    try {
      const response = await axios.post(`${API_URL}/seller/register`, user);
      console.log('Email:', email);
      setAlertMessage('Please Verify Your Email');
      setShowAlert(true);

      navigation.navigate('VerifySeller', { email });

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setCategory(''); // Reset category
    } catch (error) {
      console.log(error.response?.status, error.response?.data?.message);

      if (error.response && error.response.status === 400 && error.response.data.message === 'Email already registered') {
        setAlertMessage('Email Already Registered');
      } else {
        setAlertMessage('Registration Failed');
      }
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertMessage === 'Please Verify Your Email') {
      console.log(email);
      navigation.navigate('VerifySeller', { email });
    }
  };

  return (
    <SafeAreaView style={container}>
      <View>
        <Image source={require('../../assets/logo/logo.png')} style={logo} />
      </View>
      <KeyboardAvoidingView>
        <View style={subContainer}>
          <Text style={tagline}>Please register to be a seller</Text>
        </View>
        <View style={mainLoginBox}>
          <View style={loginBox}>
            <CustomIcon name="person" style={icon} />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              style={[inputs, { fontSize: name ? 16 : 16 }]}
            />
          </View>
          <View style={loginBox}>
            <CustomIcon name="email" style={icon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              style={[inputs, { fontSize: email ? 16 : 16 }]}
            />
          </View>
          <View style={loginBox}>
            <CustomIcon name="lock" style={icon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              style={[inputs, { fontSize: password ? 16 : 16 }]}
              secureTextEntry
            />
          </View>
          <View style={loginBox}>
            <CustomIcon name="lock" style={icon} />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              style={[inputs, { fontSize: confirmPassword ? 16 : 16 }]}
              secureTextEntry
            />
          </View>
          <View style={loginBox}>
            <CustomIcon name="category" style={icon} />
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={cat}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Laptops" value="laptops" />
              <Picker.Item label="Mobiles" value="mobiles" />
              <Picker.Item label="Tablets" value="tablets" />
              <Picker.Item label="Accessories" value="accessories" />
            </Picker>
          </View>
          <View style={touchable}>
            <Text></Text>
            <Text style={{ color: 'blue', fontWeight: '500' }}></Text>
          </View>
          <View style={{ marginTop: 20 }} />
          <Pressable
            style={[btnLogin, loading && { backgroundColor: '#ccc' }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={btnText}>Register</Text>
            )}
          </Pressable>
          <CustomAlert visible={showAlert} message={alertMessage} onClose={handleAlertClose} />
          <Pressable style={{ marginTop: 15 }} onPress={() => navigation.navigate('LoginSeller')}>
            <Text style={noAccout}>Already have an account? Sign In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterSeller;
