import React from 'react'
import './TextField.css'

const TextField = ({ type, placeholder, value, setValue, onFocusOut, onEnter, autoFocus, maxLength }) => {
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
      onKeyDown={(e) => {
        if ((e.key === 'Enter') && (onEnter)) {
          onEnter()
        }
      }}
      autoFocus={autoFocus}
      maxLength={maxLength || 255}
    />
  )
}



export default TextField