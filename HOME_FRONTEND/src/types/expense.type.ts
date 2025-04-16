type Expense = {
    expenses_ID: number;
    payment_ScheduleID: string;
    contract_rentID: string | null; // Có thể null nếu không có hợp đồng
    expenses_Name: string;
    expenses_Note?: string;
    expenses_OldIndex: number;
    expenses_NewIndex: number;
    expenses_Price: number;
    utility_ID?: number | null; // Có thể null nếu không có tiện ích
    created_at: string;
};

export default Expense;
