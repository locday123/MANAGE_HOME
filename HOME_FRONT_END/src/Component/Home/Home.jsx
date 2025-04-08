import {Card, Checkbox, Col, Dropdown, Row, Segmented, Space, Table} from "antd"
import {useEffect, useMemo, useState} from "react"
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons"

import {getAllHome} from "../../Service/Home//HomeSerivce"
import {columnsTable, FormFilter, actionsCard} from "./HomeExtend"

function Home() {
    const [home, setHome] = useState([])
    const [searchText, setSearchText] = useState("")
    const [visible, setVisible] = useState(false)
    const [isGridView, setIsGridView] = useState("List")
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [hoveredCard, setHoveredCard] = useState(null)
    const [homeData, setHomeData] = useState([])

    const [selectedValues, setSelectedValues] = useState([
        "home_ID",
        "home_Address",
        "home_RentalPrice",
        "contract",
        "home_Status",
        "action",
        "home_TotalFloors",
    ])

    const filteredData = home.filter(
        (item) =>
            item.home_ID.toLowerCase().includes(searchText.toLowerCase()) ||
            item.home_Address.toLowerCase().includes(searchText.toLowerCase())
    )
    const allSelected = selectedValues.length === columnsTable.length
    const handleSelectAll = (event) => {
        event.stopPropagation() // Ngăn dropdown bị đóng khi click
        if (allSelected) {
            setSelectedValues([]) // Bỏ chọn tất cả
        } else {
            setSelectedValues(columnsTable.map(({key}) => key)) // Chọn tất cả
        }
    }
    const handleCheckboxChange = (key, event) => {
        event.stopPropagation() // Ngăn dropdown bị đóng khi click
        setSelectedValues((prev) =>
            prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
        )
        setDropdownOpen(true) // Giữ dropdown mở
    }

    const items = useMemo(() => {
        return columnsTable.map(({key, title}) => ({
            key: key,
            label: (
                <div onClick={(e) => e.stopPropagation()} style={{padding: "0px 10px"}}>
                    <Checkbox
                        checked={selectedValues.includes(key)}
                        onChange={(event) => handleCheckboxChange(key, event)}
                    >
                        {title}
                    </Checkbox>
                </div>
            ),
        }))
    }, [columnsTable, selectedValues])
    const menu = {
        items,
    }
    const newColumns = columnsTable.map((item) =>
        Object.assign(Object.assign({}, item), {
            hidden: !selectedValues.includes(item.key),
        })
    )

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }
    useEffect(() => {
        getAllHome().then((value) => {
            setHome(value)
        })
    }, [])
    return (
        <Card
            title={
                <FormFilter
                    searchText={searchText}
                    onChange={handleSearchChange}
                    setVisible={setVisible}
                    visible={visible}
                    homeData={homeData}
                    setHomeData={setHomeData}
                />
            }
            extra={
                <Space size={"large"}>
                    {isGridView ? (
                        <Space
                            size={"small"}
                            style={{
                                border: "1px solid #ddd",
                                padding: "6px",
                                borderRadius: "8px",
                            }}
                        >
                            <Checkbox
                                checked={allSelected}
                                onChange={(event) => handleSelectAll(event)}
                            />
                            <Dropdown
                                open={dropdownOpen} // Kiểm soát trạng thái dropdown
                                onOpenChange={setDropdownOpen} // Cập nhật trạng thái khi click ngoài
                                menu={menu}
                                trigger={["click"]}
                                placement={"bottom"}
                                arrow={{pointAtCenter: true}}
                            >
                                <span>Hiển thị {selectedValues.length}</span>
                            </Dropdown>
                        </Space>
                    ) : null}

                    <Segmented
                        onChange={(value) => setIsGridView(value === "List")}
                        options={[
                            {value: "List", icon: <BarsOutlined />},
                            {value: "Grid", icon: <AppstoreOutlined />},
                        ]}
                        style={{marginRight: "16px"}}
                    />
                </Space>
            }
        >
            {isGridView ? (
                <Table
                    columns={newColumns}
                    loading={home.length ? false : true}
                    pagination={false}
                    scroll={{
                        x: "max-content",
                        y: 80 * 5,
                    }}
                    dataSource={filteredData}
                    rowKey='home_ID'
                />
            ) : (
                <Row gutter={[10, 10]}>
                    {filteredData.map((item) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={item.home_ID}>
                            <Card
                                onMouseEnter={() => setHoveredCard(item.home_ID)}
                                onMouseLeave={() => setHoveredCard(null)} // Reset khi rời chuột
                                hoverable
                                title={item.home_ID}
                                extra={hoveredCard === item?.home_ID && actionsCard()}
                            >
                                <p>
                                    <b>Địa chỉ:</b> {item.home_Address}
                                </p>
                                <p>
                                    <b>Giá thuê:</b> {item.home_RentalPrice.toLocaleString()} VND
                                </p>
                                <p>
                                    <b>Chủ nhà:</b> {item.home_HostName}
                                </p>
                                <p>
                                    <b>SĐT:</b> {item.home_HostPhoneNumber}
                                </p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Card>
    )
}
export default Home
