import React, { useState, useEffect } from 'react';
import { View, Image, Text, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/LoginStyle';
import CustomIcon from '../components/CustomIcon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const LoginSeller = () => {
    const { container, tagline, mainLoginBox, loginBox, subContainer, inputs, icon, touchable, btnLogin, btnText, logo, noAccout, divider, line, buttonText, socialContainer, socialButton, socialIcon } = styles;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    navigation.navigate('SellerMain');
                }
            } catch (err) {
                console.log('Error checking login status:', err);
            }
        };

        checkLoginStatus();
    }, [navigation]);

    const handleLogin = async () => {
        setLoading(true);
        console.log('Attempting login to:', `${API_URL}/seller/login`); 
        try {
            const user = { email, password };
            const response = await axios.post(`${API_URL}/seller/login`, user);

            const { token, name, sellerId } = response.data;

            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('userName', name);
            await AsyncStorage.setItem('sellerId', sellerId);

            Alert.alert('Login Complete');
            navigation.navigate('SellerMain');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    Alert.alert('Login Error', 'Invalid email or password');
                } else {
                    Alert.alert('Login Error', `An error occurred: ${error.response.data.message || 'Unknown error'}`);
                }
            } else if (error.request) {
                Alert.alert('Login Error', 'No response from server. Please check your network connection.');
            } else {
                Alert.alert('Login Error', `An error occurred: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={container}>
            <View>
                <Image source={require('../../assets/logo/logo.png')} style={logo} />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={subContainer}>
                    <Text style={tagline}>Login Into Your Account</Text>
                </View>
                <View style={mainLoginBox}>
                    <View style={loginBox}>
                        <CustomIcon name='email' style={icon} />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder='Enter your email'
                            style={[inputs, { fontSize: 16 }]}
                        />
                    </View>
                    <View style={loginBox}>
                        <CustomIcon name='lock' style={icon} />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder='Enter your password'
                            style={[inputs, { fontSize: 16 }]}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={touchable}>
                        <Text></Text>
                        {/* <Text style={{ color: 'blue', fontWeight: '500' }}>Forgot Password</Text> */}
                    </View>
                    <View style={{ marginTop: 80 }} />
                    <Pressable style={btnLogin} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color='#fff' />
                        ) : (
                            <Text style={btnText}>Login</Text>
                        )}
                    </Pressable>
                    <Pressable style={{ marginTop: 15 }} onPress={() => navigation.navigate('RegisterSeller')}>
                        <Text style={noAccout}>Don't have an account? Sign Up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginSeller;
