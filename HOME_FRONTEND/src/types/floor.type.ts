// floor.type.ts

import Home from "./home.type";


type Floor = {
    floor_ID: string;
    floor_Name: string;
    floor_TotalRooms: number;
    created_at: string; // ISO string
    home_ID: string;
    Home: Home
};

export default Floor;
