import axios from "axios"

axios.defaults.withCredentials = false
axios.defaults
const client = axios.create({
    baseURL: import.meta.env.VITE_REACT_API,
})

export {client}
