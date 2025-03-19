import {client} from "../Service"

let linkApi = "https://mocki.io/v1/4090f941-e352-4102-aee6-bb1d23f1c6f2"

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
