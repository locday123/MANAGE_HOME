import {Button, Col, Input, Row, Select} from "antd"
import {createFloorsForHome} from "../../Service/Floor/FloorService"
import {useState} from "react"

const FormFilter = ({searchText, data = [], valueCreate, setValueCreate}) => {
    const [message, setMessage] = useState("")

    const handleCreateFloors = async (valueCreate) => {
        const result = await createFloorsForHome(valueCreate.home_ID, valueCreate.home_TotalFloors)

        if (result?.data) {
            setMessage(`✅ Tạo ${result.data.length} tầng thành công.`)
        } else {
            setMessage(result.error || "❌ Không thể tạo tầng.")
        }
    }
    return (
        <>
            <Row gutter={[24, 24]} style={{rowGap: "10px"}}>
                <Col xxl={4} xl={6} lg={8}>
                    <Input
                        allowClear
                        value={searchText}
                        style={{
                            width: "100%",
                        }}
                        placeholder='Tìm kiếm: ID | Địa chỉ'
                    />
                </Col>
                <Col>
                    <Select
                        placeholder='Quận - Huyện'
                        onChange={(value, option) =>
                            setValueCreate({home_ID: value, home_TotalFloors: option.totalFloors})
                        }
                        options={data.map((home) => ({
                            key: home.home_ID,
                            value: home.home_ID,
                            label: home.home_ID,
                            totalFloors: home.home_TotalFloors,
                        }))}
                    />
                </Col>
                <Col>
                    <Button
                        type='primary'
                        children='Tự động thêm tầng'
                        onClick={() => handleCreateFloors(valueCreate)}
                    />
                </Col>
            </Row>
        </>
    )
}

export {FormFilter}
