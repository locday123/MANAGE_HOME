import Home from "../../types/home.type";
import dayjs from "dayjs";

export const filterHomes = (
    homes: Home[],
    searchValue: string,
    selectCheck: string[]
): Home[] => {
    if (!Array.isArray(homes) || homes.length === 0) {
        return [];
    }

    const value = searchValue?.toLowerCase() || "";
    const today = dayjs();

    const hasContract = (date: any): boolean => {
        return date && date !== "1970-01-01" && dayjs(date).isValid();
    };

    return homes.filter((home) => {
        // Lọc theo từ khóa tìm kiếm
        const matchSearch =
            (home.home_ID || "").toLowerCase().includes(value) ||
            (home.home_Address || "").toLowerCase().includes(value) ||
            (home.home_HostName || "").toLowerCase().includes(value) ||
            (home.home_HostPhoneNumber || "").toLowerCase().includes(value);

        if (selectCheck.length === 0) {
            return matchSearch;
        }

        // Lọc theo checkbox
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
            matchSearch &&
            (matchActive ||
                matchInactive ||
                matchExpiring ||
                matchExpired ||
                matchNoContract)
        );
    });
};

export const calculateHomeStatistics = (
    homes: Home[]
): {
    totalHomes: number;
    activeHomes: number;
    inactiveHomes: number;
    expiringContracts: number;
    expiredContracts: number;
    noContracts: number;
} => {
    if (!Array.isArray(homes) || homes.length === 0) {
        return {
            totalHomes: 0,
            activeHomes: 0,
            inactiveHomes: 0,
            expiringContracts: 0,
            expiredContracts: 0,
            noContracts: 0,
        };
    }

    const today = dayjs();
    const hasContract = (date: any): boolean => {
        return date && date !== "1970-01-01" && dayjs(date).isValid();
    };

    return {
        totalHomes: homes.length,
        activeHomes: homes.filter((h) => h.home_Status === "ACTIVE").length,
        inactiveHomes: homes.filter((h) => h.home_Status === "INACTIVE").length,
        expiringContracts: homes.filter(
            (h) =>
                hasContract(h.home_ContractTo) &&
                dayjs(h.home_ContractTo).isAfter(today) &&
                dayjs(h.home_ContractTo).isBefore(today.add(30, "day"))
        ).length,
        expiredContracts: homes.filter(
            (h) =>
                hasContract(h.home_ContractTo) &&
                dayjs(h.home_ContractTo).isBefore(today)
        ).length,
        noContracts: homes.filter((h) => !hasContract(h.home_ContractTo))
            .length,
    };
};

export const statsList = (
    homes: Home[]
): Array<{ label: string; value: number; key: string }> => {
    const stats = calculateHomeStatistics(homes);
    return [
        { label: "Hoạt động", value: stats.activeHomes, key: "activeHomes" },
        {
            label: "Ngưng hoạt động",
            value: stats.inactiveHomes,
            key: "inactiveHomes",
        },
        {
            label: "Sắp hết hạn",
            value: stats.expiringContracts,
            key: "expiringContracts",
        },
        {
            label: "Đã hết hạn",
            value: stats.expiredContracts,
            key: "expiredContracts",
        },
        {
            label: "Chưa hoạt động",
            value: stats.noContracts,
            key: "noContracts",
        },
    ];
};
