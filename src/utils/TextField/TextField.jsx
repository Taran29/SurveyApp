import React from 'react'
import './TextField.css'

const TextField = ({ type, placeholder, value, setValue }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="textField"
      value={value}
      onChange={(event) => {
        setValue(event.target.value)
      }}
    />
  )
}

export default TextField