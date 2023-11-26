import React, { useCallback, useEffect, useState } from "react"
import TextField from "../TextField"
import ButtonGroup from "../ButtonGroup"
import {
  createItem,
  deleteItems,
  getOneItem,
  updateItems,
} from "../../api/items"

const AddCard = ({ getTodosApi, todoId, adding, cancel, itemId }) => {
  const [name, setName] = useState("")
  const getOnetodoItemApi = useCallback(async () => {
    try {
      const response = await getOneItem(itemId)
      if (response.status === 200) {
        setName(response.data.data.name)
      }
    } catch (err) {
      console.log(err)
    }
  }, [itemId])

  useEffect(() => {
    getOnetodoItemApi()
  }, [getOnetodoItemApi])
  const OnChange = (e) => {
    setName(e.target.value)
  }
  const clear = () => {
    setName("")
    cancel()
  }
  const saveItem = async () => {
    try {
      const payload = {
        name: name,
        todoId: todoId,
      }
      const response = await createItem(payload)
      if (response.status === 201) {
        getTodosApi()
        clear()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateItemApi = async () => {
    try {
      const payload = {
        name: name,
      }
      const response = await updateItems(itemId, payload)
      if (response.status === 200) {
        getTodosApi()
        clear()
      }
    } catch (error) {}
  }
  const deleteItemApi = async (id) => {
    try {
      const response = await deleteItems(id)
      if (response.status === 200) {
        getTodosApi()
        clear()
      }
    } catch (error) {}
  }
  return (
    <div className="edit-cart">
      <div className="cart">
        <TextField
          className="edit-card-Textarea"
          name="name"
          value={name}
          placeholder="enter a title for this card..."
          onChange={OnChange}
        />
      </div>
      <ButtonGroup
        handleSave={() => {
          adding ? saveItem() : updateItemApi()
        }}
        saveLabel={adding ? "Add Card" : "Edit Card"}
        handleCancel={cancel}
        handleDelete={() => deleteItemApi(itemId)}
      />
    </div>
  )
}

export default AddCard
