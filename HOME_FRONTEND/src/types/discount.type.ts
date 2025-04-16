type Discount = {
    discount_ID: number; // ID khuyến mãi, kiểu number (tự động tăng).
    discount_Name: string; // Tên khuyến mãi, kiểu string (tối đa 50 ký tự).
    discount_Percentage: number; // Tỷ lệ giảm giá, kiểu number (0-100%).
    start_Date?: string; // Ngày bắt đầu khuyến mãi, kiểu string (theo định dạng `YYYY-MM-DD`), có thể bỏ qua.
    end_Date?: string; // Ngày kết thúc khuyến mãi, kiểu string (theo định dạng `YYYY-MM-DD`), có thể bỏ qua.
    created_at: string; // Thời gian tạo khuyến mãi, kiểu string (theo định dạng ISO 8601).
};

export default Discount;
