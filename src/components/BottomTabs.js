import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: 'discover',
    component: DiscoverScreen,
    label: 'Discover',
    icon: ({ focused }) => (
      focused ? <MaterialIcons name="search" size={24} color="gray" /> :
        <MaterialIcons name="search" size={24} color="black" />
    ),
  },

  {
    name: 'cart',
    component: CartScreen,
    label: 'Cart',
    icon: ({ focused }) => (
      focused ? <MaterialIcons name="shopping-cart" size={24} color="gray" /> :
        <MaterialIcons name="shopping-cart" size={24} color="black" />
    ),
  },
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Home',
    icon: ({ focused }) => (
      focused ? <MaterialIcons name="home" size={24} color="gray" /> :
        <MaterialIcons name="home" size={24} color="black" />
    ),
  },
  {
    name: 'category',
    component: CategoryScreen,
    label: 'Categories',
    icon: ({ focused }) => (
      focused ? <MaterialIcons name="category" size={24} color="gray" /> :
        <MaterialIcons name="category" size={24} color="black" />
    ),
  },
  {
    name: 'profile',
    component: ProfileScreen,
    label: 'Profile',
    icon: ({ focused }) => (
      focused ? <MaterialIcons name="person" size={24} color="gray" /> :
        <MaterialIcons name="person" size={24} color="black" />
    ),
  },
];

const BottomTabs = () => {
  return (
    <Tab.Navigator>
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
