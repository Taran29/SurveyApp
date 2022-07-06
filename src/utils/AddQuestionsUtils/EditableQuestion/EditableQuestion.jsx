import { useState } from 'react'
import TextField from '../../TextField/TextField'
import './EditableQuestion.css'

const EditableQuestion = ({
  setArray,
  setIndex,
  setter,
  setOptions,
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
            <span onClick={() => setIsEditing(true)}>✏️</span>
            <span onClick={() => {
              setter(oldValue => oldValue.filter((_, idx) => idx !== setIndex))
              setOptions(oldValue => oldValue.filter((_, idx) => idx !== setIndex))
              setCurrentOptions([])
              setInputOptions(false)
            }}>❌</span>
          </div>
        </div>
        :
        <div className='editable-container-textfield'>
          <TextField
            type="text"
            placeholder="Enter option..."
            value={editValue || ''}
            setValue={setEditValue}
            onEnter={onEnter}
            autoFocus={true}
          />

          <span onClick={onEnter}>✅</span>
        </div>
      }
    </>
  )
}

export default EditableQuestion