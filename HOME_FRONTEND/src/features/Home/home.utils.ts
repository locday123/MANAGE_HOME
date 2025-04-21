import Home from "../../types/home.type";
import dayjs from "dayjs";

export const filterHomes = (
    homes: Home[],
    searchValue: string,
    selectCheck: string[]
): Home[] => {
    const value = searchValue.toLowerCase();
    const today = dayjs();
    const hasContract = (date: any) =>
        date && date !== "1970-01-01" && dayjs(date).isValid();
    return homes.filter((home) => {
        // --- Lọc theo từ khóa tìm kiếm
        const matchSearch =
            (home.home_ID || "").toLowerCase().includes(value) ||
            (home.home_Address || "").toLowerCase().includes(value) ||
            (home.home_HostName || "").toLowerCase().includes(value) ||
            (home.home_HostPhoneNumber || "").toLowerCase().includes(value);

        // Nếu không có checkbox nào được chọn, chỉ lọc theo tìm kiếm
        if (selectCheck.length === 0) {
            return matchSearch;
        }

        // --- Lọc theo checkbox
        const matchActive =
            selectCheck.includes("activeHomes") &&
            home.home_Status === "ACTIVE";

        const matchInactive =
            selectCheck.includes("inactiveHomes") &&
            home.home_Status === "INACTIVE";

        const matchExpiring =
            selectCheck.includes("expiringContracts") &&
            hasContract(home.home_ContractTo) &&
            dayjs(home.home_ContractTo).isAfter(today) &&
            dayjs(home.home_ContractTo).isBefore(today.add(30, "day"));

        const matchExpired =
            selectCheck.includes("expiredContracts") &&
            hasContract(home.home_ContractTo) &&
            dayjs(home.home_ContractTo).isBefore(today);

        const matchNoContract =
            selectCheck.includes("noContracts") &&
            !hasContract(home.home_ContractTo);

        return (
            matchSearch && // Điều kiện tìm kiếm
            (matchActive || // Trạng thái là "ACTIVE" nếu chọn "activeHomes"
                matchInactive || // Trạng thái là "INACTIVE" nếu chọn "inactiveHomes"
                matchExpiring || // Có hợp đồng sắp hết hạn nếu chọn "expiringContracts"
                matchExpired || // Có hợp đồng đã hết hạn nếu chọn "expiredContracts"
                matchNoContract) // Không có hợp đồng nếu chọn "noContracts"
        );
    });
};

export const calculateHomeStatistics = (homes: Home[]) => {
    const totalHomes = homes.length;
    const activeHomes = homes.filter((h) => h.home_Status === "ACTIVE").length;
    const inactiveHomes = homes.filter(
        (h) => h.home_Status === "INACTIVE"
    ).length;

    const today = dayjs();

    const hasContract = (date: any) =>
        date && date !== "1970-01-01" && dayjs(date).isValid();

    const expiringContracts = homes.filter(
        (h) =>
            hasContract(h.home_ContractTo) &&
            dayjs(h.home_ContractTo).isBefore(today.add(30, "day")) &&
            dayjs(h.home_ContractTo).isAfter(today)
    ).length;

    const expiredContracts = homes.filter(
        (h) =>
            hasContract(h.home_ContractTo) &&
            dayjs(h.home_ContractTo).isBefore(today)
    ).length;

    const noContracts = homes.filter(
        (h) => !hasContract(h.home_ContractTo)
    ).length;

    return {
        totalHomes,
        activeHomes,
        inactiveHomes,
        expiringContracts,
        expiredContracts,
        noContracts,
    };
};

export const statsList = (homes: Home[]) => [
    {
        label: "Hoạt động",
        value: calculateHomeStatistics(homes).activeHomes,
        key: "activeHomes",
    },
    {
        label: "Ngưng hoạt động",
        value: calculateHomeStatistics(homes).inactiveHomes,
        key: "inactiveHomes",
    },
    {
        label: "Sắp hết hạn",
        value: calculateHomeStatistics(homes).expiringContracts,
        key: "expiringContracts",
    },
    {
        label: "Đã hết hạn",
        value: calculateHomeStatistics(homes).expiredContracts,
        key: "expiredContracts",
    },
    {
        label: "Chưa hoạt động",
        value: calculateHomeStatistics(homes).noContracts,
        key: "noContracts",
    },
];
