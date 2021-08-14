import React from "react";
import { Text, StyleSheet, View } from "react-native";
import dayjs from "dayjs";

export const Task = ({ item, backgroundColor }) => (
  <View style={[styles.task, backgroundColor]}>
    <Text style={styles.taskName} numberOfLines={1}>
      {item.title}
    </Text>
    <Text style={styles.taskStatus}>
      Due {dayjs(item.due).format("D/M/YYYY")}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  task: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskName: {
    fontSize: 18,
    width: "70%",
  },
  taskStatus: {
    width: "30%",
    textAlign: "right",
  },
});
