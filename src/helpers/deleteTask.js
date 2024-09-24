import axios from "axios";

export const deleteTask = async (deleteId) => {
  await axios.delete('https://simple-todo-app-server.onrender.com/api/todo', { data: {id: deleteId} });
}