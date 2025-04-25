import { useEffect, useState } from "react";
import { getAllFloor } from "../../services/Floor/floor.service";
import Floor from "../../types/floor.type";
import Rooms from "../../types/room.type";
import CustomCard from "../../components/Card/CustomCard.components";
import CustomTable from "../../components/Table/CustomTable.components";
import getRoomsColumns from "./roomColumns.features";
import { handleDeleteRooms } from "./rooms.handlers";

function RoomList() {
    const [floors, setFloors] = useState<Floor[]>([]);
    const [rooms, setRooms] = useState<Rooms[]>([]);
    const [selectedRooms, setSelectedRooms] = useState<Rooms | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllFloor();
                if (result?.data && Array.isArray(result.data)) {
                    setFloors(result.data);
                } else {
                    console.error("Dữ liệu không hợp lệ:", result);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <CustomCard>
            <CustomTable<Rooms>
                columns={getRoomsColumns({
                    onEdit: (rooms) => {
                        setSelectedRooms(rooms);
                    },
                    onDelete: (rooms: Rooms) =>
                        handleDeleteRooms(rooms, setRooms), // Truyền trực tiếp handleDelete vào
                    setRooms,
                })}
                rowKey='room_ID'
                dataSource={rooms}
                pagination={false}
                scroll={{ x: "max-content" }}
            />
        </CustomCard>
    );
}
export default RoomList;
