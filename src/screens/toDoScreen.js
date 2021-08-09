import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { TaskAPI } from "../data/taskAPI";
import { Task } from "../components/taskItem";
import { TouchableNativeFeedback } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ToDoScreen({ navigation }) {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setToDoTasks(TaskAPI.getOutstandingTasks());
    });
    return unsubscribe;
  }, [navigation]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const createNewTask = () => {
    navigation.navigate("Create new task");
  };

  const deleteTask = () => {
    TaskAPI.deleteTask(selectedTask);
    setToDoTasks(TaskAPI.getOutstandingTasks());
    toggleModal();
  }

  const updateTaskStatus = (newStatus) => {
    console.log("Updating task " + selectedTask + " with status " + newStatus);
    TaskAPI.setTaskStatus(selectedTask, newStatus);
    setToDoTasks(TaskAPI.getOutstandingTasks());
  };

  const renderItem = ({ item }) => {
    let backgroundColor;
    if (item.status === "To do") {
      backgroundColor = "#ffcccb";
    } else if (item.status === "In progress") {
      backgroundColor = "#FFFF99";
    }
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedTask(item.id);
          toggleModal();
        }}
      >
        <Task item={item} backgroundColor={{ backgroundColor }} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} onRequestClose={toggleModal} transparent={true}>
        <View style={styles.modal}>
        <View style={styles.modalBox}>
          <TouchableOpacity onPress={toggleModal} style={styles.modalClose}>
            <Ionicons name={"close"} size={30} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateTaskStatus("To do");
              toggleModal();
            }}
            style={styles.modalButton}
          >
            <Text style={styles.buttonText}>Mark as to do</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateTaskStatus("In progress");
              toggleModal();
            }}
            style={styles.modalButton}
          >
            <Text style={styles.buttonText}>Mark as in progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateTaskStatus("Completed");
              toggleModal();
            }}
            style={styles.modalButton}
          >
            <Text style={styles.buttonText}>Mark as complete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteTask} style={styles.modalButton}>
            <Text style={styles.buttonText}>Delete task</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>

      <FlatList
        data={toDoTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={createNewTask} style={styles.fab}>
        <Ionicons name={"add-circle"} size={60} color={"tomato"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalClose: {
    marginLeft: 'auto',
  },
  modalButton: {
    borderRadius: 12,
    backgroundColor: "tomato",
    padding: 15,
    margin: 7,
    elevation: 2,
    width: 170,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: 'center',
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
