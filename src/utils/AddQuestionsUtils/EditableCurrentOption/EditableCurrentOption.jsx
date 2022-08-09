import { useState } from 'react'
import TextField from '../../TextField/TextField'
import './EditableCurrentOption.css'

const EditableCurrentOption = ({
  currentOptions,
  setCurrentOptions,
  index,

}) => {

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(currentOptions[index])

  const onEnter = () => {
    let temp = currentOptions
    temp[index] = editValue
    setCurrentOptions([...temp])
    setIsEditing(false)
  }

  const onDelete = () => {
    setEditValue(currentOptions[index + 1])
    setCurrentOptions(oldValue => oldValue.filter((_, idx) => index !== idx))
  }

  return (
    <>
      {!isEditing ?
        <div className='editable-container editable-container-options' onDoubleClick={() => setIsEditing(true)}>
          <span> {index + 1}. {currentOptions[index]} </span>
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

export default EditableCurrentOption