import React from 'react'
import './TextField.css'

const TextField = ({ type, placeholder, value, setValue, onFocusOut }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="textField"
      value={value}
      onChange={(event) => {
        setValue(event.target.value)
      }}
      onBlur={onFocusOut}
    />
  )
}

export default TextField