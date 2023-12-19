import { React, useState } from 'react';
import { View, Image, Text, KeyboardAvoidingView, TextInput, Pressable,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../styles/LoginStyle';
import CustomIcon from '../components/CustomIcon';

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
                            onChange={(text) => setEmail(text)}
                            placeholder='Enter your email' style={[inputs, { fontSize: email ? 16 : 16 }]}>
                        </TextInput>
                    </View>
                    <View style={loginBox}>
                        <CustomIcon name="lock" style={icon} />
                        <TextInput
                            value={password}
                            onChange={(text) => setPassword(text)}
                            placeholder='Enter your password'
                            style={[inputs, { fontSize: email ? 16 : 16 }]}
                            secureTextEntry={true}
                        >
                        </TextInput>
                    </View>
                    <View style={touchable}>
                        <Text>
                            Keep me logged in
                        </Text>
                        <Text style={{ color: 'blue', fontWeight: 500 }}>
                            Forgot Password
                        </Text>
                    </View>
                    <View style={{ marginTop: 80 }} />
                    <Pressable style={btnLogin} onPress={() => {
                        navigation.replace('Main')
                    }}
                    >
                        <Text style={btnText}>Login</Text>
                    </Pressable>

                    <Pressable style={{ marginTop: 15 }} onPress={() => {
                        navigation.navigate("Register")
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
