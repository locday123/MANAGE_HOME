import { client } from "../Service";

let linkApi = `${import.meta.env.VITE_REACT_API}/homes`;
const getAllHome = async () => {
    try {
        const response = await client.get(`${linkApi}`);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

const addHome = async (home) => {
    try {
        const reponse = await client.post(`${linkApi}`, home);
        return reponse.data;
    } catch (error) {
        console.log(error);
    }
};

const updateHome = async (homeID, homeData) => {
    try {
        const reponse = await client.put(`${linkApi}/${homeID}`, homeData);
        return reponse.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteHome = async (homeID) => {
    try {
        let url = `${linkApi}/${homeID}`;
        const response = await client.delete(url);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

export { getAllHome, addHome, updateHome, deleteHome };
