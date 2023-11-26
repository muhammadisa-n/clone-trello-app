import axios from "axios"
import { config } from "../config"
export const getAllTodos = () => {
  return axios.get(`${config.api_host}todos`)
}
export const createTodo = (data) => {
  return axios.post(`${config.api_host}todos`, data)
}
export const getOneTodo = (id) => {
  return axios.get(`${config.api_host}todos/${id}`)
}
export const updateTodo = (id, data) => {
  return axios.put(`${config.api_host}todos/${id}`, data)
}
export const deleteTodo = (id) => {
  return axios.delete(`${config.api_host}todos/${id}`)
}
