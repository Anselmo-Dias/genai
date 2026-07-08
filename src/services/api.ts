import axios from "axios"

export const api = axios.create({
  baseURL: "https://llama-beta.mobilex.tech/api/v1",
})
