import {Input, Row, Col, Badge, Checkbox, Button, Dropdown, MenuProps, Space} from "antd"
import {calculateHomeStatistics} from "./home.utils"
import Home from "../../types/home.type"
import {DownOutlined} from "@ant-design/icons"
type HomeFilterProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    homes: Home[]
}

function HomeFilter({searchValue, onSearchChange, homes}: HomeFilterProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value)
    }

    const stats = calculateHomeStatistics(homes)
    const statLabels = [
        {key: "expiringContracts", label: "HĐ sắp hết hạn"},
        {key: "expiredContracts", label: "HĐ đã hết hạn"},
        {key: "noContracts", label: "Chưa có HĐ"},
        {key: "activeHomes", label: "ACTIVE"},
        {key: "inactiveHomes", label: "INACTIVE"},
    ]
    const items: MenuProps["items"] = statLabels.map(({key, label}) => ({
        key,
        label: (
            <Badge count={stats[key as keyof typeof stats]} offset={[1, 10]}>
                <Button
                    style={{
                        width: "10rem",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <Checkbox>{label}</Checkbox>
                </Button>
            </Badge>
        ),
    }))
    const menuProps = {
        items,
    }
    return (
        <Row gutter={16}>
            <Col xxl={4}>
                <Input
                    placeholder='Tìm kiếm nhà...'
                    allowClear
                    value={searchValue}
                    onChange={handleChange}
                />
            </Col>
            <Col>
                <Dropdown menu={menuProps} trigger={["click"]} placement='bottomLeft'>
                    <Button>
                        <Space>
                            Lọc nhà
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Col>
        </Row>
    )
}

export default HomeFilter
