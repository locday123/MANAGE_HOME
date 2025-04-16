type ContractUtility = {
    contract_rentID: string; // Mã hợp đồng thuê, kiểu string.
    utility_ID: number; // Mã tiện ích, kiểu number.
    unit_Price: number; // Giá đơn vị, kiểu number.
    unit_Type: "kWh" | "m³" | "tháng" | "người"; // Loại đơn vị tiện ích, kiểu union (có giá trị xác định).
    quantity: number; // Số lượng tiêu thụ, kiểu number.
    created_at: string; // Thời gian tạo bản ghi, kiểu string (theo định dạng ISO 8601).
};

export default ContractUtility;
