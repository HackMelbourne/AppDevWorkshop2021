import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TaskAPI } from '../data/taskAPI';
import { Task } from '../components/taskItem';

export default function CompletedScreen({navigation}) {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setCompletedTasks(TaskAPI.getCompletedTasks());
      });
      return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => {
        let backgroundColor = "#D0F0C0";
        return (
          <Task
            item={item}
            onPress={() => {}}
            backgroundColor={{backgroundColor}}
          />
        );
      };

    return (
      <View style={{ flex: 1 }}>
        <FlatList
        data={completedTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      </View>
    );
  }