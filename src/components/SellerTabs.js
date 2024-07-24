import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomIcon from './CustomIcon';
import SellerProfile from '../sellerScreens/SellerProfile';
import { FontAwesome5 } from '@expo/vector-icons';
import ToolsScreen from '../sellerScreens/ToolsScreen';
import SendRequestSeller from '../sellerScreens/SendRequestSeller'
import FriendList from '../sellerScreens/FriendList';
import ConversationListScreen from '../screens/ConversationListScreen';
const Tab = createBottomTabNavigator();
const SellerTabs = () => {

  return (
    <Tab.Navigator initialRouteName="SellerProfile">

      <Tab.Screen
        name="Suggestions"
        component={SendRequestSeller}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? <CustomIcon name="recommend" /> : <CustomIcon name="recommend" color='black' />
          ),
        }}
      />
      <Tab.Screen
        name="Connections"
        component={FriendList}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? <CustomIcon name="people" /> : <CustomIcon name="people" color='black' />
          ),
        }}
      />
      <Tab.Screen
        name="Tools"
        component={ToolsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? <FontAwesome5 name="tools" size={22} color="grey" /> : <FontAwesome5 name="tools" size={22} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
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
        component={SellerProfile}
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

export default SellerTabs;
