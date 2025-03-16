import { client } from "../Service";

let linkApi = "https://mocki.io/v1/bb4052e3-1213-4057-9888-8cb40f2103ba";

const getAllBank = async () => {
    try {
        const response = await client.get(linkApi);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};
const getBankID = (bank, bankCode) => {
    return bank.find(({ bank_Code }) => {
        return bank_Code === bankCode;
    });
};

export { getAllBank, getBankID };
