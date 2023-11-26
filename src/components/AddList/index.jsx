import React, { useState } from "react"
import "./addlist.css"
import TextField from "../TextField"
import ButtonGroup from "../ButtonGroup"
import { createTodo } from "../../api/todos"
const AddList = ({ handleCancel, getTodosApi }) => {
  const [name, setName] = useState("")
  const handleClear = () => {
    setName("")
    handleCancel()
  }
  const saveTodos = async () => {
    try {
      const payload = { name: name }
      const response = await createTodo(payload)
      if (response.status === 201) {
        getTodosApi()
        handleClear()
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="add-list-editor">
      <TextField
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter List Title"
        className="list-title-textarea"
      />
      <ButtonGroup
        saveLabel="add List"
        handleCancel={handleCancel}
        handleSave={() => saveTodos()}
      />
    </div>
  )
}

export default AddList
