import axios from "axios"
import { config } from "../config"

export const createItem = (data) => {
  return axios.post(`${config.api_host}items`, data)
}
export const getOneItem = (id) => {
  return axios.get(`${config.api_host}items/${id}`)
}
export const updateItems = (id, data) => {
  return axios.patch(`${config.api_host}items/${id}`, data)
}
export const deleteItems = (id) => {
  return axios.delete(`${config.api_host}items/${id}`)
}
export const moveItems = (id, data) => {
  return axios.patch(`${config.api_host}items/${id}/move`, data)
}
