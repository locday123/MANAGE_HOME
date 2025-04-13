import {client} from "../Service"
let linkApi = `${import.meta.env.VITE_REACT_API}/customers`

const getAllCustomer = async () => {
    try {
        const response = await client.get(`${linkApi}`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const addCustomer = async (customer) => {
    try {
        const response = await client.post(`${linkApi}`, customer)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const updatedCustomer = async (customerID, customerData) => {
    try {
        const response = await client.put(`${linkApi}/${customerID}`, customerData)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const deleteACustomer = async (userID) => {
    try {
        let urlUser = `${linkApi}/${userID}`
        const response = await client.delete(urlUser)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

export {getAllCustomer, addCustomer, deleteACustomer, updatedCustomer}
