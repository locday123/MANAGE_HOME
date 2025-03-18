import {client} from "../Service"

let linkApi = "https://mocki.io/v1/80386dfd-abda-477c-9832-20a437028c32"

const getAllRevExpenditure = async () => {
    try {
        const response = await client.get(linkApi)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}
const getBankID = (bank, bankCode) => {
    return bank.find(({bank_Code}) => {
        return bank_Code === bankCode
    })
}

export {getAllRevExpenditure}
