import { Card, Col, Grid, Row, Segmented, Table, Tag } from "antd";
import { useEffect, useState } from "react";

import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import {
    SearchBar,
    columnsTable,
    NewUsersCard,
    actionsCard,
} from "../Customer/CustomerExtend";
import { getAllCustomer } from "../../Service/Customer/CustomerSerive";

function Customer() {
    const [data, setData] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isGridView, setIsGridView] = useState(false);
    const [visible, setVisible] = useState(false);
    const [customerData, setCustomerData] = useState({});

    const filteredData = data.filter((item) => {
        const filterName = item.customer_Name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        const filterID = item.customer_ID.toString().includes(searchText);
        const filterPhoneNumber = item.customer_PhoneNumber
            .toString()
            .includes(searchText);
        return filterName || filterID || filterPhoneNumber;
    }); // Tìm kiếm Customer

    useEffect(() => {
        getAllCustomer().then((value) => {
            setData(value);
        });
    }, []);
    return (
        <>
            <NewUsersCard data={data} />
            <Card
                title={
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                        setData={setData}
                        visible={visible}
                        setVisible={setVisible}
                        customerData={customerData}
                        setCustomerData={setCustomerData}
                    />
                }
                extra={
                    <Segmented
                        onChange={(value) => setIsGridView(value === "Grid")}
                        options={[
                            { value: "List", icon: <BarsOutlined /> },
                            { value: "Grid", icon: <AppstoreOutlined /> },
                        ]}
                        style={{ marginRight: "16px" }}
                    />
                }
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.03) 0px 0px 5px 5px",
                }}
            >
                <div style={{ maxHeight: "36.1rem", overflowY: "auto" }}>
                    {isGridView ? (
                        <div style={{ padding: "16px" }}>
                            <Row gutter={[16, 16]}>
                                {filteredData.map((customer) => (
                                    <Col
                                        xs={24}
                                        sm={12}
                                        md={8}
                                        lg={8}
                                        xl={8}
                                        xxl={6}
                                        key={customer.customer_ID}
                                    >
                                        <Card
                                            hoverable
                                            onMouseEnter={() =>
                                                setHoveredCard(
                                                    customer.customer_ID
                                                )
                                            } // Lưu ID của card đang hover
                                            onMouseLeave={() =>
                                                setHoveredCard(null)
                                            } // Reset khi rời chuột
                                            onClick={() =>
                                                setCustomerData(customer)
                                            }
                                            title={customer.customer_Name}
                                            extra={
                                                hoveredCard ===
                                                    customer?.customer_ID &&
                                                actionsCard(setVisible)
                                            } // Chỉ hiển thị actions cho card đang hover
                                        ></Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ) : (
                        <Table
                            columns={columnsTable(setData, setVisible)}
                            dataSource={filteredData}
                            pagination={false} // Ẩn pagination mặc định
                            onRow={(record) => ({
                                onClick: () => {
                                    setCustomerData(record); // Gán dữ liệu vào form
                                },
                            })}
                        />
                    )}
                </div>
            </Card>
        </>
    );
}
export default Customer;
