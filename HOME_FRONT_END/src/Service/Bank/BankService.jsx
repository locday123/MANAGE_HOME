import { client } from "../Service";

let linkApi = "https://mocki.io/v1/5a7d2551-3a8f-4bd4-a0a8-66bb6cea43e1";

const getAllBank = async () => {
    try {
        const response = await client.get(linkApi);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};
const getBankID = async (bankIDa) => {
    return getAllBank().then((value) => {
        return value.find((element) => {
            return element.bankID === bankIDa;
        });
    });
};

export { getAllBank, getBankID };
