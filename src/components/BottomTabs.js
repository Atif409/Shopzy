import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';
import CustomIcon from './CustomIcon';
import ProfileScreen from '../screens/ProfileScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ConversationListScreen from '../screens/ConversationListScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setLoggedIn(!!token); 
      } catch (error) {
        console.error('Error checking login status:', error);
        
      }
    };

    checkLoginStatus(); 
  }, []);

  return (
    <Tab.Navigator initialRouteName="Home">
      {/* <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? <CustomIcon name="search" /> : <CustomIcon name="search" color='black' />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? <CustomIcon name="shopping-cart" /> : <CustomIcon name="shopping-cart" color='black' />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? <CustomIcon name="home" /> : <CustomIcon name="home" color='black' />
          ),
        }}
      />
      <Tab.Screen
        name="Message "
        component={ConversationListScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? <CustomIcon name="message" /> : <CustomIcon name="message" color='black' />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={loggedIn ? ProfileScreen : CreateProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? <CustomIcon name="person" /> : <CustomIcon name="person" color='black' />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
