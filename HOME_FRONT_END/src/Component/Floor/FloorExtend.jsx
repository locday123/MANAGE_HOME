import {Button, Col, Input, Row, Select, Tag} from "antd"
import {createFloorsForHome, getFloorsByHome} from "../../Service/Floor/FloorService"
import {useState} from "react"

const columnsTable = [
    {
        key: "floor_ID",
        title: "ID",
        dataIndex: "floor_ID",
        align: "center",
        width: "5rem",

        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "home_ID",
        title: "Home",
        dataIndex: "home_ID",
        align: "center",
        width: "5rem",
    },
    {
        key: "floor_Name",
        title: "Tầng",
        dataIndex: "floor_Name",
        align: "center",
        width: "5rem",

        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "floor_TotalRooms",
        title: "Tầng",
        dataIndex: "floor_TotalRooms",
        align: "center",
        width: "5rem",
    },
    {
        key: "created_at",
        title: "Tầng",
        dataIndex: "created_at",
        align: "center",
        width: "5rem",

        render: (value) => new Date(value).toLocaleDateString("vi-VN"),
    },
]
const FormFilter = ({data = [], valueCreate, setValueCreate, setFloors}) => {
    const [message, setMessage] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(false) // Thêm state để kiểm tra trạng thái button

    const handleCreateFloors = async (valueCreate) => {
        const {home_ID, home_TotalFloors} = valueCreate

        try {
            // B1: Lấy danh sách tầng đã có
            const existingFloors = await getFloorsByHome(home_ID)

            const currentFloorCount = existingFloors?.length || 0
            // B2: Tính số tầng còn lại
            const remainingFloors = home_TotalFloors - currentFloorCount

            if (remainingFloors <= 0) {
                setMessage("❌ Nhà này đã đủ số tầng, không thể tạo thêm.")
                setIsButtonDisabled(true) // Disable button khi đủ tầng
                return
            }

            // B3: Gọi API tạo tầng
            const result = await createFloorsForHome(home_ID, remainingFloors)

            if (result?.data) {
                setMessage(`✅ Tạo ${result.data.length} tầng thành công.`)
            } else {
                setMessage(result.error || "❌ Không thể tạo tầng.")
            }
        } catch (err) {
            console.error("Lỗi tạo tầng:", err)
            setMessage("❌ Lỗi máy chủ khi tạo tầng.")
        }
    }

    const handleChangeHome = async (home_ID) => {
        try {
            const result = await getFloorsByHome(home_ID)
            setFloors(result || []) // nếu API trả về { data: [...] }

            // Kiểm tra số tầng đã có và disable button nếu đủ tầng
            const home = data.find((h) => h.home_ID === home_ID)
            if (home) {
                const currentFloorCount = result?.length || 0
                const remainingFloors = home.home_TotalFloors - currentFloorCount
                setIsButtonDisabled(remainingFloors <= 0) // Disable button nếu đủ tầng
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tầng:", error)
        }
    }

    return (
        <>
            <Row gutter={[24, 24]} style={{rowGap: "10px"}}>
                <Col>
                    <Select
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) ||
                            (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        placeholder='Quận - Huyện'
                        onChange={(value, option) => {
                            handleChangeHome(value)
                            setValueCreate({
                                home_ID: value,
                                home_TotalFloors: option.totalFloors,
                            })
                        }}
                        options={data.map((home) => ({
                            key: home.home_ID,
                            value: home.home_ID,
                            label: home.home_Address,
                            totalFloors: home.home_TotalFloors,
                        }))}
                    />
                </Col>
                <Col>
                    <Button
                        type='primary'
                        disabled={isButtonDisabled} // Disable button nếu đủ tầng
                        children='Tự động tạo tầng'
                        onClick={() => handleCreateFloors(valueCreate)}
                    />
                </Col>
            </Row>
        </>
    )
}

export {FormFilter, columnsTable}
