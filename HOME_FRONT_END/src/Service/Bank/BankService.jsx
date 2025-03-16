import {client} from "../Service"

let linkApi = "https://mocki.io/v1/6c77b353-9f0a-4755-bc18-a7394dd00127"

const getAllBank = async () => {
    try {
        const response = await client.get(linkApi)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}
const getBankID = async (bankCode) => {
    return getAllBank().then((value) => {
        return value.find((element) => {
            return element.bank_Code === bankCode
        })
    })
}

export {getAllBank, getBankID}
