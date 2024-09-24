import "./FilterPanel.css";
import PropTypes from "prop-types";
import { useMemo } from "react";
import CategoryList from "./CategoryList";
import { useAppContext } from "../context/AppProvider";
import { IoSearch } from "react-icons/io5";

const FILTER_ITEMS = [
  {
    id: "all",
    label: "All",
    icon: "/inbox.png",
  },
  {
    id: "important",
    label: "Important",
    icon: "/flag.png",
  },
  {
    id: "completed",
    label: "Completed",
    icon: "/check.png",
  },
  {
    id: "delete",
    label: "Delete",
    icon: "/delete.png",
  },
];

const FilterPanel = () => {
  const {
    todoList,
    selectedFilterId,
    setSelectedFilterId,
    searchText,
    setSearchText,
  } = useAppContext();

  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, curr) => {
        let newAcc = { ...acc };
        if (curr.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (curr.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }   
        if (curr.isDelete) {
          newAcc = { ...newAcc, all: newAcc.all - 1 , delete: newAcc.delete + 1 };
        }
        return newAcc;
      },
      { all: todoList.length, important: 0, completed: 0, delete: 0 }
    );
  }, [todoList]);

  console.log(countByFilterType);

  return (
    <div className="filter-panel">
      <div className="filter-search-wrapper">
        <input
          className="filter-input"
          type="text"
          name="search-text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button className="filter-button-search">
          <IoSearch/>
        </button>
      </div>
      <div className="filter-container">
        {FILTER_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`filter-item ${
              item.id === selectedFilterId ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedFilterId(item.id);
            }}
          >
            <div className="filter-name">
              <img src={item.icon} alt="" />
              <p>{item.label}</p>
            </div>
            <p className="filter-count">{countByFilterType[item.id]}</p>
          </div>
        ))}
      </div>

      <CategoryList
      // todoList={props.todoList}
      // selectedCategoryId={props.selectedCategoryId}
      // setSelectedCategoryId={props.setSelectedCategoryId}
      />
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  selectedCategoryId: PropTypes.string,
  setSelectedCategoryId: PropTypes.func,
};

export default FilterPanel;
