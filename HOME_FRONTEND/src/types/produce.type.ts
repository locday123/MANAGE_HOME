type Produce = {
    produce_ID: string; // ID sản phẩm, kiểu string (tối đa 30 ký tự).
    produce_Name: string; // Tên sản phẩm, kiểu string (tối đa 255 ký tự).
    produce_Series?: string; // Mã series của sản phẩm, kiểu string (tối đa 30 ký tự).
    produce_Purchase: string; // Ngày mua sản phẩm, kiểu string (theo định dạng `YYYY-MM-DD`).
    produce_Price: bigint; // Giá sản phẩm, kiểu bigint (không âm).
    produce_Coverage?: string; // Ngày hết hạn bảo hành, kiểu string (theo định dạng `YYYY-MM-DD`).
    produce_Note?: string; // Ghi chú về sản phẩm, kiểu string (tối đa 255 ký tự).
    produce_Status: "NEW" | "IN_USE" | "MAINTENANCE"; // Trạng thái sản phẩm.
    created_at: string; // Thời gian tạo sản phẩm, kiểu string (theo định dạng ISO 8601).
};

export default Produce;
