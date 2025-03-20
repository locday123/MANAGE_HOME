import { client } from "../Service";

let linkApi = "https://mocki.io/v1/e6dfbfbc-780b-4598-a63e-dcee5bb73201";

const getAllFloor = async () => {
    try {
        const response = await client.get(linkApi);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

const searchHomeInFloor = (floor, value) => {
    return floor.filter((element) => {
        return element.home_ID === value;
    });
};

export { getAllFloor, searchHomeInFloor };
