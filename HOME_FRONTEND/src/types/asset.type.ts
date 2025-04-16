type Asset = {
    asset_ID: bigint; // ID tài sản, kiểu bigint, tự động tăng.
    room_ID: string; // ID phòng chứa tài sản, kiểu string (tối đa 30 ký tự).
    produce_ID: string; // ID sản phẩm được sử dụng, kiểu string (tối đa 30 ký tự).
    asset_Note?: string; // Ghi chú tài sản, kiểu string (tối đa 255 ký tự), có thể bỏ qua.
    asset_Status: "NEW" | "IN_USE" | "MAINTENANCE" | "BROKEN"; // Trạng thái tài sản.
    created_at: string; // Thời gian tạo bản ghi tài sản, kiểu string (theo định dạng ISO 8601).
};

export default Asset;
