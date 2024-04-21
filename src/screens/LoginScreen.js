import React, { useState, useEffect } from 'react';
import { View, Image, Text, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../styles/LoginStyle';
import CustomIcon from '../components/CustomIcon';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@env';


const LoginScreen = () => {
    const { container,
        tagline,
        mainLoginBox,
        loginBox,
        subContainer,
        inputs,
        icon,
        touchable,
        btnLogin,
        btnText,
        logo, noAccout,
        divider,
        line,
        buttonText,
        socialContainer,
        socialButton,
        socialIcon,
    } = styles;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");

                if (token) {
                    navigation.navigate('Main')
                }
            } catch (err) {
                console.log("Error checking login status:", err);
                // Handle the error, maybe redirect to login or show an alert
            }
        };

        checkLoginStatus();
    }, []);
    const handleLogin = async () => {
        try {
            const user = {
                email: email,
                password: password,
            };

            const response = await axios.post(`${API_URL}/customer/login`, user);
            const token = response.data.token;
            await AsyncStorage.setItem("authToken", token);
            Alert.alert("Login Complete");
        } catch (error) {


            if (error.response && error.response.status === 401) {
                Alert.alert("Login Error", "Invalid email or password");
            } else {
                Alert.alert("Login Error", "An error occurred during login");
                console.log("Login error:", error);
                if (error.response) {
                    console.log("Response status:", error.response.status);
                }
            }
        }
    };



    return (
        <SafeAreaView style={container} >

            <View>
                <Image
                    source={require('../../assets/logo/logo.png')}
                    style={logo}
                />
            </View>
            <KeyboardAvoidingView>
                <View style={subContainer}>
                    <Text style={tagline}>
                        Login Into Your Account
                    </Text>
                </View>
                <View style={mainLoginBox}>
                    <View style={loginBox}>
                        <CustomIcon name="email" style={icon} />

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder='Enter your email'
                            style={[inputs, { fontSize: email ? 16 : 16 }]}
                        />
                    </View>
                    <View style={loginBox}>
                        <CustomIcon name="lock" style={icon} />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder='Enter your password'
                            style={[inputs, { fontSize: email ? 16 : 16 }]}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={touchable}>
                        <Text>
                            {/* Keep me logged in */}
                        </Text>
                        <Text style={{ color: 'blue', fontWeight: 500 }}>
                            Forgot Password
                        </Text>
                    </View>
                    <View style={{ marginTop: 80 }} />
                    <Pressable style={btnLogin} onPress={handleLogin}


                    >
                        <Text style={btnText}>Login</Text>
                    </Pressable>

                    <Pressable style={{ marginTop: 15 }} onPress={() => {
                        navigation.navigate('Register')
                    }}
                    >
                        <Text style={noAccout}>Don't have an account? Sign Up</Text>
                    </Pressable>


                    <>
                        <View style={divider}>
                            <View style={line} />
                            <Text style={buttonText}>Or Login with</Text>
                            <View style={line} />
                        </View>
                        <View style={socialContainer}>
                            <TouchableOpacity
                                onPress={() => console.log("Facebook Pressed")}
                                style={socialButton}
                            >
                                <Image
                                    source={require("../../assets/icons/facebook.png")}
                                    style={socialIcon}
                                    resizeMode='contain'
                                />
                                <Text>Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => console.log("Google Pressed")}
                                style={socialButton}
                            >
                                <Image
                                    source={require("../../assets/icons/google.png")}
                                    style={socialIcon}
                                    resizeMode='contain'
                                />
                                <Text>Google</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen
