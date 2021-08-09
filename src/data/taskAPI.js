import uuid from 'react-native-uuid';

const tasks = [];

export const TaskAPI = {
    getOutstandingTasks() {
      
        return tasks.filter(task => task.status !== "Completed");
    },
    getCompletedTasks() {
      
        return tasks.filter(task => task.status === "Completed");
    },
    createNewTask(newTitle,dueDate) {
      tasks.push({id: uuid.v4(), title: newTitle, due: dueDate, status: "To do"});
      console.log(tasks);
    },
    deleteTask(taskId) {
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex >= 0) {
        tasks.splice(taskIndex,1);
      }
    },
    setTaskStatus(taskId, newStatus) {
      console.log(taskId);
      for (let task of tasks) {
        if (task.id === taskId) {
          task.status = newStatus;
          return;
        }
      }
    }
}