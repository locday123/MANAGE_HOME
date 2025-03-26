import { client } from "../Service";
``;
let linkApi = "https://67e41d1e2ae442db76d31ae4.mockapi.io/api/customer/";

const getAllCustomer = async () => {
    try {
        const response = await client.get(linkApi);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

const addCustomer = async (customer) => {
    try {
        const reponse = await client.post(linkApi, customer);
        return reponse.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteACustomer = async (userID) => {
    try {
        let urlUser = linkApi + userID;
        const response = await client.delete(urlUser, userID);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

export { getAllCustomer, addCustomer, deleteACustomer };
