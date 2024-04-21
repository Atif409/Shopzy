import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';
import CustomIcon from './CustomIcon';
const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: 'discover',
    component: DiscoverScreen,
    label: 'Discover',
    icon: ({ focused }) => (
      focused ? <CustomIcon name="search" /> :
      <CustomIcon name="search" color='black'/> 
    ),
  },

  {
    name: 'cart',
    component: CartScreen,
    label: 'Cart',
    icon: ({ focused }) => (
      focused ? <CustomIcon name="shopping-cart" /> :
      <CustomIcon name="shopping-cart" color='black'/> 
    ),
  },
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Home',
    icon: ({ focused }) => (
      focused ?<CustomIcon name="home" /> :
      <CustomIcon name="home" color='black'/> 
    ),
  },
  {
    name: 'category',
    component: CategoryScreen,
    label: 'Messages',
    icon: ({ focused }) => (
      focused ? <CustomIcon name="message" /> :
      <CustomIcon name="message" color='black'/> 
    ),
  },
  {
    name: 'profile',
    component: ProfileScreen,
    label: 'Profile',
    icon: ({ focused }) => (
      focused ? <CustomIcon name="person" />  :
      <CustomIcon name="person" color='black'/> 
    ),
  },
];

const BottomTabs = () => {
  return (
    
    <Tab.Navigator initialRouteName="Home">
      {tabScreens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            headerShown: false,
            tabBarLabel: screen.label,
            tabBarLabelStyle: {
              color: '#008E97',
            },
            tabBarIcon: screen.icon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabs;
