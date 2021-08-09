import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './src/navigation/homeStack';
import CompletedScreen from './src/screens/completedScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'create'
              : 'create-outline';
          } else if (route.name === 'Completed') {
            iconName = focused ? 'checkbox' : 'checkbox-outline';
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          marginBottom: 8,
        },
        tabBarStyle: {
          height: 68,
        },
      })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Completed" component={CompletedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}