import React from "react"
import "./buttongroup.css"
const ButtonGroup = (props) => {
  const { handleSave, saveLabel, handleDelete, handleCancel } = props
  return (
    <div className="edit-buttons">
      <div className="edit-button" style={{ backgroundColor: "#5aac44" }}>
        {saveLabel}
      </div>
      <div className="edit-button-cancel" onClick={handleCancel}>
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </div>
  )
}

export default ButtonGroup
