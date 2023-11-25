import React, { useState } from "react"
import "./addlist.css"
import TextField from "../TextField"
import ButtonGroup from "../ButtonGroup"
const AddList = ({ handleCancel }) => {
  const [name, setName] = useState("")
  return (
    <div className="add-list-editor">
      <TextField
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter List Title"
        className="list-title-textarea"
      />
      <ButtonGroup saveLabel="add List" handleCancel={handleCancel} />
    </div>
  )
}

export default AddList
