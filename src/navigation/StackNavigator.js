import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import OnBoardingScreen from '../screens/OnBoardingScreen'
import BottomTabs from '../components/BottomTabs'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer initialRouteName="Onboarding">
            <Stack.Navigator>
                <Stack.Screen 
                name="OnBoarding"
                 options={{ headerShown: false }}
                  component={OnBoardingScreen} />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
export default StackNavigator