import Customer from "../../types/customer.type";

export const filterCustomers = (
    customers: Customer[],
    searchValue: string
): Customer[] => {
    const value = searchValue.toLowerCase();

    return customers.filter((customer) => {
        return (
            (customer.customer_Name || "").toLowerCase().includes(value) ||
            (customer.customer_PhoneNumber || "")
                .toLowerCase()
                .includes(value) ||
            (customer.customer_ID || "").toLowerCase().includes(value)
        );
    });
};
