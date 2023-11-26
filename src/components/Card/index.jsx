import React, { useEffect, useState } from "react"
import "./card.css"
import Title from "../Title"
import TextField from "../TextField"
import { deleteTodo, getOneTodo, updateTodo } from "../../api/todos"
import AddCard from "../AddCard"
import { moveItems } from "../../api/items"
const Card = ({ todos, getTodosApi }) => {
  const [editList, setEditList] = useState({ status: false, id: "", name: "" })
  const [cart, setCart] = useState([])
  const [todoId, setTodoId] = useState(null)
  const [itemId, setItemId] = useState(null)
  const [hover, setHover] = useState(null)
  useEffect(() => {
    setCart(todos)
  }, [todos])
  const toggleEditList = async (id, status) => {
    try {
      const response = await getOneTodo(id)
      if (response.status === 200) {
        setEditList({
          ...editList,
          status: status,
          id: response.data.data.id,
          name: response.data.data.name,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onEnter = async (e, id) => {
    try {
      if (e.keyCode === 13) {
        const payload = {
          name: editList.name,
        }
        const response = await updateTodo(id, payload)
        if (response.status === 200) {
          setEditList({
            ...editList,
            status: false,
            id: "",
            name: "",
          })
          getTodosApi()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onChange = (e) => {
    setEditList({ ...editList, [e.target.name]: e.target.value })
  }
  const deleteTodoApi = async (id) => {
    try {
      if (window.confirm("Are You Sure ?")) {
        const response = await deleteTodo(id)
        if (response.status === 200) {
          getTodosApi()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const toggleAddCart = (id) => {
    const _temp = [...cart]
    _temp.forEach((cart) => {
      if (cart.id === id) {
        cart.status = !cart.status
      }
    })
    setCart(_temp)
    setTodoId(id)
  }

  const toggleEditCard = (todoId, itemId) => {
    const _temp = [...cart]
    _temp.forEach((cart) => {
      if (cart.id === todoId) {
        cart.items.forEach((item) => {
          if (item.id === itemId) {
            item.isEdit = !item.isEdit
          }
        })
      }
    })
    setCart(_temp)
    setTodoId(todoId)
    setItemId(itemId)
  }

  const MoveItemApi = async (todoId, itemId) => {
    try {
      const payload = {
        targetTodoId: todoId,
      }
      const response = await moveItems(itemId, payload)
      if (response.status === 200) {
        getTodosApi()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {cart.map((todo, i) => (
        <div className="list" key={i}>
          <div className="lists-card">
            {editList.status && editList.id === todo.id ? (
              <TextField
                name="name"
                value={editList.name}
                className="list-title-textarea"
                onChange={onChange}
                deletelist={() => deleteTodoApi(editList.id)}
                handleCancel={() =>
                  setEditList({ ...editList, status: false, id: "", name: "" })
                }
                onEnter={(e) => onEnter(e, editList.id)}
              />
            ) : (
              <Title onClick={() => toggleEditList(todo.id, true)}>
                {todo.name}
              </Title>
            )}
            {todo.items.map((item, t) => (
              <React.Fragment key={t}>
                {!item.isEdit ? (
                  <div
                    className="card"
                    key={item.id}
                    onMouseEnter={() => setHover(item.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {hover === item.id && (
                      <div className="card-icons">
                        <div
                          className="card-icon"
                          onClick={() => toggleEditCard(todo.id, item.id)}
                        >
                          <ion-icon name="pencil-outline"></ion-icon>
                        </div>

                        {i !== 0 && (
                          <div
                            className="card-icon"
                            onClick={() => MoveItemApi(cart[i - 1].id, item.id)}
                          >
                            <ion-icon name="arrow-back-outline"></ion-icon>
                          </div>
                        )}
                        {cart.length - 1 !== i && (
                          <div
                            className="card-icon"
                            onClick={() => MoveItemApi(cart[i + 1].id, item.id)}
                          >
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                          </div>
                        )}
                      </div>
                    )}
                    {item.name}
                  </div>
                ) : (
                  <AddCard
                    getTodosApi={getTodosApi}
                    todoId={todoId}
                    itemId={itemId}
                    cancel={() => toggleEditCard(todo.id, item.id)}
                  />
                )}
              </React.Fragment>
            ))}

            {todo.status ? (
              <AddCard
                getTodosApi={getTodosApi}
                todoId={todoId}
                adding
                cancel={() => toggleAddCart(todo.id)}
              />
            ) : (
              <div
                className="toggle-add-card"
                onClick={() => toggleAddCart(todo.id)}
              >
                <ion-icon name="add-outline"></ion-icon> Add Card
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default Card
