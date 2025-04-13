import {client} from "../Service"
let linkApi = `${import.meta.env.VITE_API_URL}/customers`

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

const checkCustomerExists = async (customerID) => {
    try {
        const res = await client.get(`${linkApi}/check-id/${customerID}`)
        return res.data
    } catch (err) {
        console.error("Check CCCD failed:", err)
        return {exists: false}
    }
}

export {getAllCustomer, addCustomer, deleteACustomer, updatedCustomer, checkCustomerExists}
