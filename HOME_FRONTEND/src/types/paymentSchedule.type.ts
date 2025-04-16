type PaymentSchedule = {
    payment_ScheduleID: string; // Mã lịch thanh toán, kiểu string (tối đa 30 ký tự).
    contract_rentID: string; // Mã hợp đồng thuê liên quan, kiểu string (tối đa 20 ký tự).
    payment_Method: "CASH" | "BANK_TRANSFER" | "MOMO" | "CREDIT_CARD"; // Phương thức thanh toán.
    bank_AccountID?: string | null; // Mã tài khoản ngân hàng sử dụng, kiểu string (tối đa 30 ký tự), có thể null.
    payment_Amount: number; // Số tiền cần thanh toán, kiểu number (BigInt chuyển thành số).
    payment_Date: string; // Ngày thanh toán, kiểu string (theo định dạng ISO 8601).
    payment_Note?: string | null; // Ghi chú thanh toán, kiểu string (có thể null).
    payment_Status: "PENDING" | "PAID" | "OVERDUE" | "CANCELLED" | "REFUNDED"; // Trạng thái thanh toán.
    created_at: string; // Thời điểm tạo lịch thanh toán, kiểu string (theo định dạng ISO 8601).
};

export default PaymentSchedule;
