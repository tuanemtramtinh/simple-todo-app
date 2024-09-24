import axios from 'axios';

export const updateTask = async (willingUpdateTask) => {
  console.log(willingUpdateTask);
  const updatedTask = await axios.patch('https://simple-todo-app-server.onrender.com/api/todo', willingUpdateTask);
  return updatedTask;
}