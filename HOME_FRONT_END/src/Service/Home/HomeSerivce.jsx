import {client} from "../Service"

let linkApi = "https://mocki.io/v1/49442560-67fa-4af0-83cb-301e2467000f"

const getAllHome = async () => {
    try {
        const response = await client.get(linkApi)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

export {getAllHome}
