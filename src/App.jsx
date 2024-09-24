import "./App.css";
import FilterPanel from "./components/FilterPanel";
import Sidebar from "./components/Sidebar";
import TodoItem from "./components/TodoItem";
import { useMemo, useRef } from "react";
import { useAppContext } from "./context/AppProvider";
import { FaPlus } from "react-icons/fa";
import { addNewTask } from "./helpers/addNewTask";

function App() {
  const {
    todoList,
    setTodoList,
    activeTodoItemId,
    searchText,
    selectedFilterId,
    selectedCategoryId,
    showSidebar,
  } = useAppContext();

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const inputRef = useRef();

  const handleKeyDownAddNewTask = async (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      const newTask = {
        id: crypto.randomUUID(),
        name: value,
        isImportant: false,
        isCompleted: false,
        isDelete: false,
        categories: "personal",
      };
      setTodoList([
        ...todoList,
        newTask
      ]);
      inputRef.current.value = "";
      await addNewTask(newTask);
    }
  }

  const filteredTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.includes(searchText)) {
        return false;
      }
      if (selectedCategoryId.includes(todo.categories)) {
        if (selectedFilterId === "all") {
          if (todo.isDelete) return false;
          return true;
        }
        if (selectedFilterId === "important") {
          if (todo.isDelete) return false;
          return todo.isImportant;
        }
        if (selectedFilterId === "completed") {
          if (todo.isDelete) return false;
          return todo.isCompleted;
        }
        return todo.isDelete;
      }
    });
  }, [selectedFilterId, todoList, searchText, selectedCategoryId]);

  return (
    <>
      <div className="container">
        <FilterPanel />
        <div className="main-content">
          <div className="task-add-wrapper">
            <FaPlus
             className="task-add-icon"
            />
            <input
              ref={inputRef}
              type="text"
              name="add-new-task"
              placeholder="Add new task"
              className="task-input"
              onKeyDown={handleKeyDownAddNewTask}
            />
          </div>
          <div>
            {filteredTodos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  name={todo.name}
                  isImportant={todo.isImportant}
                  isCompleted={todo.isCompleted}
                />
              );
            })}
          </div>
          {showSidebar && (
            <Sidebar key={activeTodoItemId} todoItem={activeTodoItem} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
