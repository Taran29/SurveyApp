import { useState, useEffect, useRef } from 'react'
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
    setCategory(e.target.value)
    const checkName = (name, str) => {
      let pattern = str.split("").map((x) => {
        return `(?=.*${x})`
      }).join("");
      let regex = new RegExp(`${pattern}`, "g")
      return name.match(regex);
    }

    let str = e.target.value.toLowerCase().substring(0, 3)
    let temp = categories.filter((x) => {
      var xSub = x.substring(0, 3).toLowerCase()
      return x.toLowerCase().includes(str) || checkName(xSub, str)
    })
    setFilteredCategories(temp)
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
          return <div key={index} className='option' onClick={() => setPresetCategory(category)}>
            {category}
          </div>
        })}
      </div>
    </div>
  )
}

export default Dropdown