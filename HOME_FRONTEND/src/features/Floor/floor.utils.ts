import Floor from "../../types/floor.type";

export const filterFloors = (
    floors: Floor[],
    searchValue: string
): Floor[] => {
    const value = searchValue.toLowerCase();

    return floors.filter((floor) => {
        return (
            (floor.floor_ID || "").toLowerCase().includes(value) ||
            (floor.floor_Name || "").toLowerCase().includes(value) ||
            (floor.home_ID || "").toLowerCase().includes(value)
        );
    });
};
