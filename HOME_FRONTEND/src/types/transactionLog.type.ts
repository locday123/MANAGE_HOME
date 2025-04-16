type TransactionLog = {
    log_ID: number;
    table_Name: string;
    record_ID: string;
    action_Type: "INSERT" | "UPDATE" | "DELETE";
    action_Detail: string;
    user_ID: string;
    created_at: string;
};
export default TransactionLog;
