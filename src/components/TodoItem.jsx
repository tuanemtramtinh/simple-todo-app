import PropTypes from "prop-types";
import { useAppContext } from "../context/AppProvider";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoItem = (props) => {
  const { handleCompleteCheckboxChange, handleClickShowSidebar, handleDeleteItem } =
    useAppContext();


  return (
    <div
      onClick={() => {
        handleClickShowSidebar(props.id);
      }}
      className="todo-item"
    >
      <div
        style={{
          display: "flex",
          gap: 4,
        }}
        className="todo-item-wrapper"
      >
        <input
          onChange={() => {
            handleCompleteCheckboxChange(props.id);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="checkbox"
          checked={props.isCompleted}
          name=""
          id=""
          className="todo-item-checkbox"
        />
        <p className="todo-item-text">{props?.name}</p>
      </div>
      <div className="todo-item-function">
        {props.isImportant && (
          <p
            style={{ color: "#FFDF00", fontSize: "18px", marginRight: "15px" }}
          >
            <FaStar />
          </p>
        )}
        <button
          onClick={(e) => {handleDeleteItem(e, props.id)}}
          className="todo-item-delete"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  isImportant: PropTypes.bool,
  isCompleted: PropTypes.bool,
  handleClickShowSidebar: PropTypes.func,
  handleCompleteCheckboxChange: PropTypes.func,
};

export default TodoItem;
