import { React, useState } from 'react';
import { View, Image, Text, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { styles } from '../styles/LoginStyle';

const RegisterScreen = () => {
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
    logo, noAccout
  } = styles;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  return (
    <SafeAreaView style={container} >

      <View>
        <Image
          source={require('../../assets/logo.png')}
          style={logo}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={subContainer}>
          <Text style={tagline}>
            Register To Your Account
          </Text>
        </View>
        <View style={mainLoginBox}>
          <View style={loginBox}>
            <MaterialIcons name="person" size={24} color="grey" style={icon} />
            <TextInput
              value={name}
              onChange={(text) => setName(text)}
              placeholder='Enter your name' style={[inputs, { fontSize: email ? 16 : 16 }]}>
            </TextInput>
          </View>
          <View style={loginBox}>
            <MaterialIcons name="email" size={24} color="grey" style={icon} />
            <TextInput
              value={email}
              onChange={(text) => setEmail(text)}
              placeholder='Enter your email' style={[inputs, { fontSize: email ? 16 : 16 }]}>
            </TextInput>
          </View>
          <View style={loginBox}>
            <MaterialIcons name="lock" size={24} color="grey" style={icon} />
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
            console.log("Login Pressed")
          }}
          >
            <Text style={btnText}>Register</Text>
          </Pressable>

          <Pressable style={{ marginTop: 15 }} onPress={() => {
            navigation.navigate("Login")
          }}
          >
            <Text style={noAccout}>Already have an account? Sign In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen