import { client } from "../Service";

let linkApi = "https://mocki.io/v1/d7bb89a9-1e54-4dd9-ac9b-8edd276b4903";

const getAllCustomer = async () => {
    try {
        const response = await client.get(linkApi);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

export { getAllCustomer };
