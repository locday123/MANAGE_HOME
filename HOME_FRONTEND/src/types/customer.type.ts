type Customer = {
    customer_ID: string;
    customer_Name: string;
    customer_Sex: boolean;
    customer_PhoneNumber: string;
    customer_Province: string;
    customer_District: string;
    customer_Ward: string;
    customer_Address: string;
    customer_Date: string;
    customer_Front: string;
    customer_Back: string;
    customer_Status: "ACTIVE" | "INACTIVE";
    created_at: string;
};

export default Customer;
