import { client } from "../Service";

let linkApi = "https://mocki.io/v1/4ce35725-92e1-4ddb-8897-9261c9345fb8";

const getAllFinance = async () => {
    try {
        const response = await client.get(linkApi);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};
const getFinanceID = async (finance, bankID) => {
    return finance.find((element) => {
        return element.bank_Code === bankID;
    });
};

export { getAllFinance, getFinanceID };
