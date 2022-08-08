import React, { useState, useEffect, useRef } from 'react'
import './Dropdown.css'

const Dropdown = ({
  category,
  categories,
  setCategory,
  dropdown,
  setDropdown,
  setPresetCategory,
}) => {

  const [filteredCategories, setFilteredCategories] = useState(categories)
  const [noResults, setNoResults] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (dropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [dropdown]) //eslint-disable-line react-hooks/exhaustive-deps

  const dropdownSearch = (e) => {
    setNoResults(false)
    setCategory(e.target.value)
    const checkName = (name, str) => {
      let pattern = str.split("").map((x) => {
        return `(?=.*${x})`
      }).join("");
      let regex = new RegExp(`${pattern}`, "ig")
      return name.match(regex);
    }

    let str = e.target.value.toLowerCase()
    let filteredArr = categories.filter((x) => {
      let xSub = x.category.substring(0, 3).toLowerCase()
      return x.category.toLowerCase().includes(str) || checkName(xSub, str)
    })
    if (filteredArr.length > 0) {
      setFilteredCategories(filteredArr)
      setNoResults(false)
    } else {
      setFilteredCategories(categories)
      setDropdown(false)
      setNoResults(true)
    }
  }

  const optionClicked = (category) => {
    setNoResults(false)
    setPresetCategory(category)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <input
        type="text"
        placeholder='Start typing...'
        value={category || ''}
        onChange={e => dropdownSearch(e)}
        className='textField'
        id="category"
        onFocus={() => setDropdown(true)}
        autoComplete="off"
      />
      <div className={dropdown ? 'dropdown-visible' : 'options-list'}>
        {filteredCategories.map((category, index) => {
          return (
            <React.Fragment key={index}>
              {category.category !== 'Other' &&
                <div className='option' onClick={() => optionClicked(category)}>
                  {category.category}
                </div>
              }
            </React.Fragment>
          )
        })}
        <div className='option' onClick={() => optionClicked({ category: 'Other' })}>Other</div>
      </div>
      {noResults && <span className='no-results'>No results found</span>}
    </div>
  )
}

export default Dropdown