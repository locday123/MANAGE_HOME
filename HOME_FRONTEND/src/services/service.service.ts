import axios from "axios"

axios.defaults.withCredentials = false
axios.defaults
const service = axios.create({
    baseURL: import.meta.env.VITE_REACT_API,
})

export {service}
