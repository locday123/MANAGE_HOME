import {Button} from "antd"
import CustomCard from "../../components/Card/CustomCard.components"
import Floor from "../../types/floor.type"
import CustomTable from "../../components/Table/CustomTable.components"
import {getFloorsColumns} from "./floorColumns.features"
import {filterFloors} from "./floor.utils"
import {deleteFloor, getAllFloor} from "../../services/Floor/floor.service"
import {useEffect, useState} from "react"
import FloorFilter from "./floorFilter.features"

function FloorList() {
    const [floor, setFloor] = useState<Floor[]>([])

    const [searchValue, setSearchValue] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedFloor, setselectedFloor] = useState<Floor | null>(null)
    const [selectedHome, setSelectedHome] = useState<string>("")

    const filteredData = filterFloors(floor, searchValue)
    console.log(floor)

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllFloor() // Gọi API lấy dữ liệu Floor
            if (result && Array.isArray(result.data)) {
                setFloor(result.data) // Lưu dữ liệu vào state nếu đúng định dạng
                // Mặc định chọn nhà đầu tiên từ dữ liệu floor
                const firstHomeId = result.data[0]?.home_ID || ""
                setSelectedHome(firstHomeId) // Cập nhật homeID đầu tiên hoặc để trống nếu không có
            } else {
                console.error("Dữ liệu không hợp lệ:", result)
            }
        }

        fetchData()
    }, [])

    const handleDelete = async (floor: Floor) => {
        try {
            await deleteFloor(floor.floor_ID) // Gọi API xóa tầng
            setFloor((prev) => prev.filter((f) => f.floor_ID !== floor.floor_ID))
        } catch (error) {
            console.error("Lỗi khi xóa tầng:", error)
        }
    }

    return (
        <CustomCard
            title={
                <FloorFilter
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    floors={floor}
                    selectedHome={selectedHome}
                    onHomeChange={setSelectedHome}
                />
            }
            extra={
                <Button
                    children='Thêm tầng'
                    type='primary'
                    onClick={() => {
                        setIsEdit(false)
                        setselectedFloor(null)
                        setModalOpen(true)
                    }}
                />
            }
        >
            <CustomTable<Floor>
                columns={getFloorsColumns({
                    onEdit: (floor) => {
                        setselectedFloor(floor)
                        setIsEdit(true)
                        setModalOpen(true)
                    },
                    onDelete: handleDelete, // Truyền trực tiếp handleDelete vào
                })}
                rowKey='floor_ID'
                dataSource={filteredData}
                pagination={false}
                scroll={{x: "max-content"}}
            />
        </CustomCard>
    )
}
export default FloorList
