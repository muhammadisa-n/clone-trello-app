import React from "react"
import "./title.css"
const Title = ({ onClick, children }) => {
  return (
    <div onClick={onClick} className="list-title">
      {children}
    </div>
  )
}

export default Title
