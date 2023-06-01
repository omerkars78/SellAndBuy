import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from './Products';
import ProfileScreen from './ProfileScreen';
import UrunSat from './UrunSat';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native'; 

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Products') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'SellProduct') {
            iconName = focused ? 'plus' : 'plus';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let label;

          if (route.name === 'Products') {
            label = 'Products For Sale';
          } else if (route.name === 'SellProduct') {
            label = 'Sell Product';
          } else if (route.name === 'Profile') {
            label = 'Profile';
          }

          return <Text style={{ color: color }}>{label}</Text>;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}
    >
      <Tab.Screen name="Products" component={Products} options={{ title: 'Products For Sale',headerTitleAlign: 'center' }} />
      <Tab.Screen name="SellProduct" component={UrunSat} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default Home;
