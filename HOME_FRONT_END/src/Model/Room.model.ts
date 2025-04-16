// models/room.model.ts

export type RoomStatus =
    | "AVAILABLE"
    | "OCCUPIED"
    | "MAINTENANCE"
    | "INACTIVE"
    | "ACTIVE";

export interface Room {
    room_ID: string; // ID phòng
    floor_ID: string; // ID tầng (liên kết với FLOOR)
    room_Name: string; // Tên phòng
    room_Area: string; // Diện tích (chuỗi, ví dụ: "30m2")
    room_Status?: RoomStatus; // Trạng thái phòng
    created_at?: string; // Thời gian tạo (ISO string từ DB)
}
