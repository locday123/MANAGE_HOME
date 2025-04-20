import Home from "../../types/home.type";

export const filterHomes = (
    homes: Home[],
    searchValue: string
): Home[] => {
    const value = searchValue.toLowerCase();

    return homes.filter((home) => {
        return (
            (home.home_ID || "").toLowerCase().includes(value) ||
            (home.home_Address || "").toLowerCase().includes(value) ||
            (home.home_HostName || "").toLowerCase().includes(value) ||
            (home.home_HostPhoneNumber || "").toLowerCase().includes(value)
        );
    });
};
