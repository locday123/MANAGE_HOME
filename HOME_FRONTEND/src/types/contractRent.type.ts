type ContractRent = {
    contract_rentID: string; // Mã hợp đồng thuê, kiểu string (tối đa 20 ký tự).
    room_ID: string; // Mã phòng thuê, kiểu string (tối đa 20 ký tự).
    customer_ID: string; // Mã khách hàng thuê chính, kiểu string (tối đa 30 ký tự).
    contract_rentDeposit: bigint; // Số tiền đặt cọc, kiểu bigint.
    contract_rentPayment: bigint; // Số tiền thanh toán mỗi kỳ, kiểu bigint.
    contract_rentFrom: string; // Ngày bắt đầu hợp đồng, kiểu string (theo định dạng `YYYY-MM-DD`).
    contract_rentTo: string; // Ngày kết thúc hợp đồng, kiểu string (theo định dạng `YYYY-MM-DD`).
    contract_rentSignature?: string; // Ảnh chữ ký số của hợp đồng, kiểu string (có thể bỏ qua).
    contract_rentStatus: 0 | 1 | 2 | 3; // Trạng thái hợp đồng: 0 - chưa kích hoạt, 1 - đã kích hoạt, 2 - hết hạn, 3 - hủy.
    discount_ID?: number; // Mã khuyến mãi (có thể null nếu không có).
    created_at: string; // Thời điểm tạo hợp đồng, kiểu string (theo định dạng ISO 8601).
};

export default ContractRent;
