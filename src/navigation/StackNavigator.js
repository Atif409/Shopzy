import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import OnBoardingScreen from '../screens/OnBoardingScreen'
import BottomTabs from '../components/BottomTabs'
import SellerTabs from '../components/SellerTabs'
import VerifyScreen from '../screens/VerifyScreen'
import RegisterSeller from '../sellerScreens/RegisterSeller'
import PaymentScreen from '../screens/PaymentScreen'
import CardScreen from '../screens/CardScreen'
import LoginSeller from '../sellerScreens/LoginSeller'
import VerifySeller from '../sellerScreens/VarifySeller'
import AddProduct from '../sellerScreens/AddProduct'
import DisplayProducts from '../sellerScreens/DisplayProducts'
import MessagesScreen from '../screens/MessagesScreen'
import SellerStoreScreen from '../sellerScreens/SellerStoreScreen '
import ProductDetailsScreen from '../screens/ProductDetailsScreen '
import AddressScreen from '../screens/AddressScreen'
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
                <Stack.Screen
                    name="VerifyScreen"
                    component={VerifyScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="PaymentScreen"
                    component={PaymentScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="CardScreen"
                    component={CardScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="RegisterSeller"
                    component={RegisterSeller}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="LoginSeller"
                    component={LoginSeller}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="SellerMain"
                    component={SellerTabs}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="VerifySeller"
                    component={VerifySeller}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="AddProduct"
                    component={AddProduct}
                    options={{ headerShown: false }} />

                <Stack.Screen
                    name="DisplayProducts"
                    component={DisplayProducts}
                    options={{ headerShown: false }} />

                <Stack.Screen
                    name="Messages"
                    component={MessagesScreen}
                    options={{ headerShown: false }} />

                <Stack.Screen name="Store"
                    component={SellerStoreScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetails"
                    component={ProductDetailsScreen}
                    options={{ headerShown: false }} />
                                    <Stack.Screen name="AddressScreen"
                    component={AddressScreen}
                    options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackNavigator
