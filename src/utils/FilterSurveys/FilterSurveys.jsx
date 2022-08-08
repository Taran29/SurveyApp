import React from 'react'
import './FilterSurveys.css'

const FilterSurveys = ({
  filterSelection,
  setFilterSelection,
  categories
}) => {

  const optionClicked = (e) => {
    if (e.target.value === 'None') {
      setFilterSelection('')
      return
    }

    setFilterSelection(e.target.value)
  }

  return (
    <div>
      <span className='filter-text'>Filter by category</span>
      <select className='category-select' value={filterSelection === '' ? 'Choose' : filterSelection} onChange={(e) => optionClicked(e)}>
        <option disabled>Choose</option>
        {categories.length > 0 && categories.map((category, index) => {
          return <React.Fragment key={index}>
            {category.category !== 'Other' && <option>{category.category}</option>}
          </React.Fragment>
        })}
        <option>Other</option>
        <option>None</option>
      </select>
    </div>
  )
}

export default FilterSurveys