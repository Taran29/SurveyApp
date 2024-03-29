import { useState } from 'react'
import TextField from '../../TextField/TextField'
import './EditableOption.css'

const EditableOption = ({
  index,
  optionIndex,
  options,
  setOptions
}) => {

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(options[index][optionIndex])

  const onEnter = () => {
    let temp = options
    temp[index][optionIndex] = editValue
    setOptions([...temp])
    setIsEditing(false)
  }

  const onDelete = () => {
    setEditValue(options[index][optionIndex + 1])

    let temp = options
    temp[index] = temp[index].filter((_, idx) => idx !== optionIndex)
    setOptions([...temp])
  }

  return (
    <>
      {!isEditing ?
        <div className='editable-container editable-container-options' onDoubleClick={() => setIsEditing(true)}>
          <span> {optionIndex + 1}. {options[index][optionIndex]} </span>
          <div className='button-container'>
            <span className='emoji' onClick={() => setIsEditing(true)}>✏️</span>
            <span className='emoji' onClick={onDelete}>❌</span>
          </div>
        </div>
        :
        <div className='editable-container-textfield'>
          <TextField
            type="text"
            placeholder="Enter option(max 100 chars)..."
            value={editValue || ''}
            setValue={setEditValue}
            onEnter={onEnter}
            autoFocus={true}
            maxLength={100}
          />

          <span onClick={onEnter}>✅</span>
        </div>
      }
    </>
  )
}

export default EditableOption