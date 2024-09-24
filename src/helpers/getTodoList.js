import axios from 'axios';

export const getTodoList = async () => {
  try {
    const todoList = await axios.get('https://simple-todo-app-server.onrender.com/api/todo');
    return todoList.data;
  } catch (error) {
    console.log(error);
  }
}