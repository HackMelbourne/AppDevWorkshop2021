import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import { TaskAPI } from "../data/taskAPI";
import { Task } from "../components/taskItem";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";

export default function CreateTaskScreen({ navigation }) {
  const [text, onChangeText] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const createNewTask = () => {
    if (text !== "") {
      TaskAPI.createNewTask(text, date.toString());
      navigation.navigate("To Do");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 12 }}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="Task title"
        style={styles.input}
      />
      <Text style={styles.selectedDueDate}>Due date: {dayjs(date.toString()).format("dddd, MMMM D, YYYY")}</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => {setShow(true);}}>
        <Text style={styles.dateButtonText}>Set due date</Text>
      </TouchableOpacity>
      {show && <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChangeDate}
      />}
      <TouchableOpacity style={styles.submitButton} onPress={createNewTask}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dateButton: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginVertical: 10,
  },
  submitButton: {
    borderRadius: 12,
    backgroundColor: "tomato",
    padding: 12,
    elevation: 2,
  },
  dateButtonText: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20,
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  selectedDueDate: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
});
