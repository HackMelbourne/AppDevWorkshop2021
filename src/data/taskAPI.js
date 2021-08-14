import uuid from "react-native-uuid";

const tasks = [];

/**
 * task object schema:
 * id
 * title
 * due
 * status
 */

export const TaskAPI = {
  getOutstandingTasks() {
    console.log('Getting outstanding tasks');
    return tasks.filter((task) => task.status !== "Completed");
  },
  getCompletedTasks() {
    console.log('Getting completed tasks');
    return tasks.filter((task) => task.status === "Completed");
  },
  createNewTask(newTitle, dueDate) {
    tasks.push({
      id: uuid.v4(),
      title: newTitle,
      due: dueDate,
      status: "To do",
    });
    console.log(tasks);
  },
  deleteTask(taskId) {
    console.log('Deleting task ' + taskId);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex >= 0) {
      tasks.splice(taskIndex, 1);
    }
  },
  setTaskStatus(taskId, newStatus) {
    console.log('Updating status of task ' + taskId);
    for (let task of tasks) {
      if (task.id === taskId) {
        task.status = newStatus;
        return;
      }
    }
  },
};
