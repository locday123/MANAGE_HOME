import Home from "../../types/home.type";
import dayjs from "dayjs";

export type HomeFilterKey =
  | "expiringContracts"
  | "expiredContracts"
  | "noContracts"
  | "activeHomes"
  | "inactiveHomes";

export const filterHomes = (
  homes: Home[],
  searchValue: string,
 
): Home[] => {
  const today = dayjs();
  const value = searchValue.toLowerCase();

  const hasContract = (date: any) =>
    date && date !== "1970-01-01" && dayjs(date).isValid();

  return homes.filter((home) => {
    // --- Lọc theo từ khóa tìm kiếm
    const matchSearch =
      (home.home_ID || "").toLowerCase().includes(value) ||
      (home.home_Address || "").toLowerCase().includes(value) ||
      (home.home_HostName || "").toLowerCase().includes(value) ||
      (home.home_HostPhoneNumber || "").toLowerCase().includes(value);

   
  });
};


export const calculateHomeStatistics = (homes: Home[]) => {
    const totalHomes = homes.length
    const activeHomes = homes.filter((h) => h.home_Status === "ACTIVE").length
    const inactiveHomes = homes.filter((h) => h.home_Status === "INACTIVE").length

    const today = dayjs()

    const hasContract = (date: any) => date && date !== "1970-01-01" && dayjs(date).isValid()

    const expiringContracts = homes.filter(
        (h) =>
            hasContract(h.home_ContractTo) &&
            dayjs(h.home_ContractTo).isBefore(today.add(30, "day")) &&
            dayjs(h.home_ContractTo).isAfter(today)
    ).length

    const expiredContracts = homes.filter(
        (h) => hasContract(h.home_ContractTo) && dayjs(h.home_ContractTo).isBefore(today)
    ).length

    const noContracts = homes.filter((h) => !hasContract(h.home_ContractTo)).length

    return {
        totalHomes,
        activeHomes,
        inactiveHomes,
        expiringContracts,
        expiredContracts,
        noContracts,
    }
}
