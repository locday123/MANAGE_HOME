import {client} from "../Service"

let linkApi = "https://67e41d1e2ae442db76d31ae4.mockapi.io/api/homes"

const getAllHome = async () => {
    try {
        const response = await client.get(linkApi)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

export {getAllHome}
