import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDoScreen from '../screens/toDoScreen';
import CreateTaskScreen from '../screens/createTask';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="To Do">
      <HomeStack.Screen name="To Do" component={ToDoScreen} />
      <HomeStack.Screen name="Create new task" component={CreateTaskScreen} />
    </HomeStack.Navigator>
  );
}
