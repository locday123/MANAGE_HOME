// models/floor.model.ts

export interface Floor {
    floor_ID: string; // ID tầng
    home_ID: string; // ID nhà (liên kết với HOME)
    floor_Name: string; // Tên tầng
    floor_TotalRooms: number; // Tổng số phòng của tầng
    created_at?: string; // Thời gian tạo (ISO string từ DB)
}
