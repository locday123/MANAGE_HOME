import {Button, Card, Col, Collapse, Row, Segmented, Table} from "antd"
import {useEffect, useState} from "react"
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons"

import {getAllHome} from "../../Service/Home//HomeSerivce"
import {columnsTable, FormFilter} from "./HomeExtend"
import {getAllFloor, searchHomeInFloor} from "../../Service/FLOOR/FloorService"

function Home() {
    const [home, setHome] = useState([])
    const [searchText, setSearchText] = useState("")
    const [isGridView, setIsGridView] = useState("List")
    const filteredData = home.filter(
        (item) =>
            item.home_ID.toLowerCase().includes(searchText.toLowerCase()) ||
            item.home_Address.toLowerCase().includes(searchText.toLowerCase())
    )
    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }
    useEffect(() => {
        getAllHome().then((value) => {
            setHome(value)
        })
    }, [home != null])
    return (
        <Card
            title={<FormFilter searchText={searchText} onChange={handleSearchChange} />}
            extra={
                <Segmented
                    onChange={(value) => setIsGridView(value === "List")}
                    options={[
                        {value: "List", icon: <BarsOutlined />},
                        {value: "Grid", icon: <AppstoreOutlined />},
                    ]}
                    style={{marginRight: "16px"}}
                />
            }
        >
            {isGridView ? (
                <Table
                    columns={columnsTable}
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
                            <Card title={item.home_ID}>
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
