import { CATEGORY_ITEMS } from '../constants';
import { useAppContext } from '../context/AppProvider';
import './Category.css'
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { FaFolder } from "react-icons/fa";

const CategoryList = () => {

  const {
    todoList,
    selectedCategoryId, setSelectedCategoryId
  } = useAppContext();

  const handleClickChangeCategoryId = (categoryId) => {
    setSelectedCategoryId(categoryId);
  }

  const counterByCategory = useMemo(() => {
    return todoList.reduce((acc, curr) => {
      if (curr.isDelete === false){
        return {...acc, [curr.categories] : acc[curr.categories] + 1}
      }
      return {...acc}
    }, {
      personal: 0,
      company: 0,
      travel: 0,
      idea: 0
    })
  }, [todoList])

  return (
    <div>
      <p className='category-title'>Categories</p>
      <div>
        {CATEGORY_ITEMS.map((item) => {
          return (
            <div onClick={() => {handleClickChangeCategoryId(item.id)}} key={item.id} className={`category-item ${item.id === selectedCategoryId ? 'selected' : ''}`} >
              <div className='category-name'>
                <FaFolder/>           
                <p className="">{item.label}</p>
              </div>
              <p>{counterByCategory[item.id]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

CategoryList.propTypes = {
  todoList: PropTypes.array,
  selectedCategoryId : PropTypes.string,
  setSelectedCategoryId : PropTypes.func
}

export default CategoryList;