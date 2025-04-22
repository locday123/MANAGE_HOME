import {Input, Row, Col, Badge, Checkbox, Button, Dropdown, MenuProps, Space} from "antd"
import Home from "../../types/home.type"
import {DownOutlined} from "@ant-design/icons"
import type {CheckboxChangeEvent} from "antd/es/checkbox"

import {statsList} from "./home.utils"
type HomeFilterProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    homes: Home[]
    onCheckbox: React.Dispatch<React.SetStateAction<string[]>>
}

function HomeFilter({searchValue, onSearchChange, homes, onCheckbox}: HomeFilterProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value)
    }
    const handleCheckbox = (e: CheckboxChangeEvent) => {
        const value = e.target.value
        const isChecked = e.target.checked

        // Nếu checkbox được chọn, thêm vào mảng; nếu không, loại bỏ giá trị khỏi mảng
        onCheckbox((prev) => {
            if (isChecked) {
                return [...prev, value]
            } else {
                return prev.filter((item) => item !== value)
            }
        })
    }

    const items: MenuProps["items"] = statsList(homes).map(({value, label, key}) => ({
        key,
        label: (
            <Badge count={value} offset={[1, 10]}>
                <Button
                    style={{
                        width: "10rem",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <Checkbox onChange={handleCheckbox} value={key}>
                        {label}
                    </Checkbox>
                </Button>
            </Badge>
        ),
    }))
    const totalCount = statsList(homes).reduce((sum, item) => sum + item.value, 0)

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
                    <Badge count={totalCount} offset={[1, 10]}>
                        <Button>
                            <Space>
                                Lọc nhà
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Badge>
                </Dropdown>
            </Col>
        </Row>
    )
}

export default HomeFilter
