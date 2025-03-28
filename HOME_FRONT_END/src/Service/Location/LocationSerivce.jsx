import { client } from "../Service";

let linkApi = "https://esgoo.net/api-tinhthanh";

const getProvinces = async () => {
    try {
        const response = await client.get(`${linkApi}/1/0.htm`);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

const getDistricts = async (provinceId) => {
    try {
        const response = await client.get(`${linkApi}/2/${provinceId}.htm`);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

const getWards = async (districtId) => {
    try {
        const response = await client.get(`${linkApi}/3/${districtId}.htm`);
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

export { getProvinces, getDistricts, getWards };
