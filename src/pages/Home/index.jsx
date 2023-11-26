import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import Board from "../../components/Board"
import "./list.css"
import AddList from "../../components/AddList"
import Card from "../../components/Card"
import { getAllTodos } from "../../api/todos"
const HomePage = () => {
  const [isToggleList, setIsToggleList] = useState(false)
  const [todos, setTodos] = useState([])
  const getTodosApi = async () => {
    try {
      const response = await getAllTodos()

      response.data.data.forEach((res) => {
        res.status = false
        res.items.forEach((item) => {
          item.isEdit = false
        })
      })
      setTodos(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getTodosApi()
  }, [])
  return (
    <>
      <Header>MERN Clone Trello App</Header>
      <Board>
        <Card todos={todos} getTodosApi={() => getTodosApi()} />
        <div className="add-list">
          {isToggleList ? (
            <AddList
              handleCancel={() => setIsToggleList(false)}
              getTodosApi={() => getTodosApi()}
            />
          ) : (
            <div
              className="add-list-button"
              onClick={() => setIsToggleList(true)}
            >
              <ion-icon name="add-outline"></ion-icon> Add a list
            </div>
          )}
        </div>
      </Board>
    </>
  )
}

export default HomePage
