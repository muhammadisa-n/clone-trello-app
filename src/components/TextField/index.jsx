import React from "react"
import TextAreaAutoSize from "react-textarea-autosize"
import "./textfield.css"
const TextField = (props) => {
  const {
    name,
    value,
    onChange,
    placeholder,
    className,
    deletelist,
    handleCancel,
    onEnter,
  } = props
  return (
    <>
      <div className="list-title-edit">
        <TextAreaAutoSize
          autoFocus
          className={className}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ width: deletelist ? 220 : 254 }}
          onKeyDown={onEnter}
        />
        {deletelist && (
          <>
            <ion-icon name="trash-outline" onClick={deletelist}></ion-icon>
            <ion-icon name="close" onClick={handleCancel}></ion-icon>
          </>
        )}
      </div>
    </>
  )
}

export default TextField
