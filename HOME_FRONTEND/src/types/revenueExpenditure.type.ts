type RevenueExpenditure = {
    revenueExpenditure_ID: string;
    revenueExpenditure_Form: "THU" | "CHI";
    revenueExpenditure_Method: "TIỀN MẶT" | "CHUYỂN KHOẢN";
    revenueExpenditureType_ID?: string;
    revenueExpenditure_Content?: string;
    payment_ScheduleID?: string;
    bank_AccountID?: string;
    amountReceived_Amount: number;
    dateAdd: string;
};

export default RevenueExpenditure;
