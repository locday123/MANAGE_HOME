import {useEffect, useState} from "react"

import CustomCard from "../../components/Card/CustomCard.components"
import CustomTable from "../../components/Table/CustomTable.components"

import {getFloorsColumns} from "./floorColumns.features"
import FloorFilter from "./floorFilter.features"

import {handleDeleteFloor} from "./floor.handlers"

import Home from "../../types/home.type"
import Floor from "../../types/floor.type"

import {createFloorsForHome, getFloorsByHomeID} from "../../services/Floor/floor.service"
import {getAllHome} from "../../services/Home/homes.service"

function FloorList() {
    const [floor, setFloor] = useState<Floor[]>([])
    const [homes, setHomes] = useState<Home[]>([])
    const [maxFloors, setMaxFloors] = useState<number>(0)
    const [selectedFloor, setselectedFloor] = useState<Floor | null>(null)
    const [selectedHome, setSelectedHome] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllHome()
                if (result?.data && Array.isArray(result.data)) {
                    setHomes(result.data)
                    const firstHome = result.data[0]
                    if (firstHome) {
                        setSelectedHome(firstHome.home_ID)
                        setMaxFloors(firstHome.home_TotalFloors) // Lưu max tầng
                        fetchFloorsByHomeID(firstHome.home_ID) // Gọi tầng tương ứng
                    }
                } else {
                    console.error("Dữ liệu không hợp lệ:", result)
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error)
            }
        }

        fetchData()
    }, [])

    const fetchFloorsByHomeID = async (homeId: string) => {
        if (!homeId) return

        try {
            const result = await getFloorsByHomeID(homeId)
            if (result?.data) {
                setFloor(result.data)
            } else {
                setFloor([])
            }
        } catch (error) {
            console.error("Lỗi khi gọi API tầng theo nhà:", error)
        }
    }

    const handleHomeChange = (home_ID: any, option: any) => {
        setMaxFloors(option.totalFloor)
        setSelectedHome(home_ID)
        fetchFloorsByHomeID(home_ID) // Gọi API lấy tầng cho nhà đã chọn
    }

    const createFloorsForHomeHandler = async (home_ID: string, floorCount: number) => {
        try {
            const response = await createFloorsForHome(home_ID, floorCount)

            // Kiểm tra nếu response có data và data là mảng
            if (response && response.data) {
                const newFloors = Array.isArray(response.data) ? response.data : [response.data] // Nếu không phải mảng, bọc nó vào mảng

                // Cập nhật state floor, thêm các tầng mới vào danh sách cũ
                setFloor((prev) => [...prev, ...newFloors])
            } else {
                // Nếu response không có data, xử lý lỗi
                console.error("Không có dữ liệu tầng trả về")
            }
        } catch (error) {
            // Xử lý lỗi nếu có vấn đề khi gọi API
            console.error("Lỗi khi tạo tầng:", error)
        }
    }

    return (
        <CustomCard
            title={
                <FloorFilter
                    homes={homes}
                    selectedHome={selectedHome}
                    onHomeChange={handleHomeChange}
                    currentFloorCount={floor.length}
                    maxFloor={maxFloors}
                    onAddFloor={createFloorsForHomeHandler}
                />
            }
        >
            <CustomTable<Floor>
                columns={getFloorsColumns({
                    onEdit: (floor) => {
                        setselectedFloor(floor)
                    },
                    onDelete: (floor: Floor) => handleDeleteFloor(floor, setFloor), // Truyền trực tiếp handleDelete vào
                })}
                rowKey='floor_ID'
                dataSource={floor}
                pagination={false}
                scroll={{x: "max-content"}}
            />
        </CustomCard>
    )
}
export default FloorList
