import {Input, Row, Col, Select} from "antd"
import Home from "../../types/home.type"
import Floor from "../../types/floor.type"

type FloorFilterProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    floors: Floor[] // Truyền danh sách tầng thay vì danh sách nhà
    selectedHome: string
    onHomeChange: (homeId: string) => void
}

function FloorFilter({
    searchValue,
    onSearchChange,
    floors,
    selectedHome,
    onHomeChange,
}: FloorFilterProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value)
    }

    const handleHomeChange = (value: string) => {
        onHomeChange(value)
    }

    const homeOptions = [...new Set(floors.map((floor) => floor.home_ID))]
    const homes = homeOptions
        .map((homeId) => {
            const home = floors.find((floor) => floor.home_ID === homeId)?.Home
            return home
        })
        .filter((home): home is Home => home !== undefined)
    return (
        <Row gutter={16}>
            <Col xxl={4}>
                <Input
                    placeholder='Tìm kiếm tầng...'
                    allowClear
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </Col>
            <Col xxl={4}>
                <Select
                    placeholder='Chọn nhà'
                    value={selectedHome}
                    onChange={handleHomeChange}
                    style={{width: "100%"}}
                >
                    {homes.map((home) => (
                        <Select.Option key={home.home_ID} value={home.home_ID}>
                            {home.home_Address}
                        </Select.Option>
                    ))}
                </Select>
            </Col>
        </Row>
    )
}

export default FloorFilter
