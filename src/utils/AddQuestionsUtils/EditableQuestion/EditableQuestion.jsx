import { useState } from 'react'
import TextField from '../../TextField/TextField'
import './EditableQuestion.css'

const EditableQuestion = ({
  setArray,
  setIndex,
  setter,
  options,
  setOptions,
  currentOptions,
  setCurrentOptions,
  setInputOptions,
}) => {

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(setArray[setIndex])

  const onEnter = () => {
    let temp = setArray
    temp[setIndex] = editValue
    setter([...temp])
    setIsEditing(false)
  }

  return (
    <>
      {!isEditing ?
        <div className='editable-container' onDoubleClick={() => setIsEditing(true)} >
          <span className='editable'> {setArray[setIndex]} </span>
          <div className='button-container'>
            <span className='emoji' onClick={() => setIsEditing(true)}>✏️</span>
            <span className='emoji' onClick={() => {
              setEditValue(setArray[setIndex + 1])
              setter(oldValue => oldValue.filter((_, idx) => idx !== setIndex))
              if (options[setIndex] === currentOptions) {
                setCurrentOptions([])
              }
              if (currentOptions.length === 0) {
                setInputOptions(false)
              }
              setOptions(oldValue => oldValue.filter((_, idx) => idx !== setIndex))
            }}>❌</span>
          </div>
        </div>
        :
        <div className='editable-container-textfield'>
          <TextField
            type="text"
            placeholder="Enter question(max 200 chars)..."
            value={editValue || ''}
            setValue={setEditValue}
            onEnter={onEnter}
            autoFocus={true}
            maxLength={200}
          />

          <span onClick={onEnter}>✅</span>
        </div>
      }
    </>
  )
}

export default EditableQuestion