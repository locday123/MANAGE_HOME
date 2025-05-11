import {useEffect, useState} from "react"
import {getRoomsByFloorID} from "../../services/Room/room.service"
import Rooms from "../../types/room.type"
import CustomCard from "../../components/Card/CustomCard.components"
import CustomTable from "../../components/Table/CustomTable.components"
import getRoomsColumns from "./roomColumns.features"
import {handleDeleteRooms} from "./rooms.handlers"

type RoomListProps = {
    floor_ID: string // truyền đúng tên floor_ID để lấy danh sách phòng
}

function RoomList({floor_ID}: RoomListProps) {
    const [rooms, setRooms] = useState<Rooms[]>([])
    const [selectedRoom, setSelectedRoom] = useState<Rooms | null>(null)

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                if (!floor_ID) return
                const result = await getRoomsByFloorID(floor_ID)
                if (result?.data && Array.isArray(result.data)) {
                    setRooms(result.data)
                } else {
                    console.error("Dữ liệu không hợp lệ:", result)
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error)
            }
        }

        fetchRooms()
    }, [floor_ID])

    return (
        <CustomCard>
            <CustomTable<Rooms>
                showHeader={false}
                columns={getRoomsColumns({
                    onEdit: (room) => setSelectedRoom(room),
                    onDelete: (room) => handleDeleteRooms(room, setRooms),
                    setRooms,
                })}
                rowKey='room_ID'
                dataSource={rooms}
                pagination={false}
                scroll={{x: "max-content"}}
            />
        </CustomCard>
    )
}

export default RoomList
