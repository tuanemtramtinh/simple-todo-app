import axios from "axios";

export const addNewTask = async (newTask) => {
  const returnNewTask = await axios.post('https://simple-todo-app-server.onrender.com/api/todo', newTask); 
  return returnNewTask.data;
}