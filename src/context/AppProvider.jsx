import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getTodoList } from "../helpers/getTodoList";
import { updateTask } from "../helpers/updateTask";
import { deleteTask } from "../helpers/deleteTask";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Đi học thêm",
      isImportant: false,
      isCompleted: true,
      isDelete: false,
      categories: "personal",
    },
    {
      id: "2",
      name: "Đi học võ",
      isImportant: true,
      isCompleted: false,
      isDelete: false,
      categories: "travel",
    },
    {
      id: "3",
      name: "Đi ngủ",
      isImportant: false,
      isCompleted: false,
      isDelete: false,
      categories: "personal",
    },
  ]);

  // const [todoList, setTodoList] = useState([]);

  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("personal");

  const handleCompleteCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleClickShowSidebar = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = async (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
    await updateTask(newTodo);
  };

  const handleDeleteItem = async (e, id) => {
    e.stopPropagation();
    const newTodoList = todoList.map((item) => item.id === id ? {...item, isDelete: true} : {...item});
    setTodoList(newTodoList);
    await deleteTask(id);
  }

  useEffect(() => {
    const fetchData = async () => {
      const newTask = await getTodoList();
      console.log(newTask);
      setTodoList([...todoList, ...newTask]);
    }
    fetchData();
  }, []);

  // console.log({todoList});

  return (
    <AppContext.Provider
      value={{
        todoList,
        setTodoList,
        activeTodoItemId,
        setActiveTodoItemId,
        showSidebar,
        setShowSidebar,
        selectedFilterId,
        setSelectedFilterId,
        searchText,
        setSearchText,
        selectedCategoryId,
        setSelectedCategoryId,
        handleCompleteCheckboxChange,
        handleClickShowSidebar,
        handleTodoItemChange,
        handleDeleteItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
};

export const useAppContext = () => {
  return useContext(AppContext);
};
