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
const searchFinance = (finance, value) => {
    return finance.filter((element) => {
        return (
            element.bank_AccountNumber.includes(value) ||
            element.bank_Code.toLowerCase().includes(value.toLocaleLowerCase())
        );
    });
    return finance.find((element) => {
        return element.bank_Code === value;
    });
};

export { getAllFinance, searchFinance };
