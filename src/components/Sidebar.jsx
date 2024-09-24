import { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import { CATEGORY_ITEMS } from "../constants";
import { useAppContext } from "../context/AppProvider";

const Sidebar = (props) => {
  const { handleTodoItemChange, setShowSidebar } = useAppContext();

  const data = props.todoItem;
  const [name, setName] = useState(data.name);
  const [isImportant, setIsImportant] = useState(data.isImportant);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);
  const [categories, setCategories] = useState(data.categories);

  const handleSave = () => {
    const newTodo = {
      ...data,
      name: name,
      isImportant: isImportant,
      isCompleted: isCompleted,
      categories: categories,
    };
    handleTodoItemChange(newTodo);
    setShowSidebar(false);
  };

  return (
    <div className="sidebar">
      <form className="sb-form" action="">
        <div className="sb-form-field">
          <input
            id="sb-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              // props.handleTodoNameChange(data.id, e.target.value);
              setName(e.target.value);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-important">Is important?</label>
          <input
            id="sb-name"
            name="isImportant"
            type="checkbox"
            checked={isImportant}
            onChange={() => {
              setIsImportant(!isImportant);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-completed">Is completed?</label>
          <input
            id="sb-completed"
            name="isCompleted"
            type="checkbox"
            checked={isCompleted}
            onChange={() => {
              setIsCompleted(!isCompleted);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-category">Category</label>
          <select
            name=""
            value={categories}
            id="sb-category"
            onChange={(e) => {
              setCategories(e.target.value);
            }}
          >
            {CATEGORY_ITEMS.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="sb-footer">
        <button className="save" onClick={handleSave}>Save</button>
        <button className="cancel"
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setShowSidebar: PropTypes.func,
  todoItem: PropTypes.shape({
    name: PropTypes.string,
    isImportant: PropTypes.bool,
    isCompleted: PropTypes.bool,
    categories: PropTypes.string,
  }),
  handleTodoItemChange: PropTypes.func,
};

export default Sidebar;
