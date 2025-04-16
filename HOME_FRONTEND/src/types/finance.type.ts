// src/types/finance.type.ts
type Finance = {
    bank_AccountID: string;
    bank_AccountNumber: string;
    bank_AccountName: string;
    bank_Code: string;
    total_Amount: bigint;
    bank_Status: "ACTIVE" | "INACTIVE";
    created_at: string;
};

export default Finance;
