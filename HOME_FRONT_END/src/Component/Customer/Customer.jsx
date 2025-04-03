import { Card, Col, Row, Segmented, Table, Tag } from "antd";
import { useEffect, useState } from "react";

import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import {
    SearchBar,
    columnsTable,
    filteredData,
} from "../Customer/CustomerExtend";
import { getAllCustomer } from "../../Service/Customer/CustomerSerive";
import CustomerStatistics from "./CustomerStatistics";
import CustomerGirdView from "./CustomerGirdView";

function Customer() {
    const [data, setData] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isGridView, setIsGridView] = useState(false);
    const [visible, setVisible] = useState(false);
    const [customerData, setCustomerData] = useState({});

    useEffect(() => {
        getAllCustomer().then((value) => {
            setData(value);
        });
    }, []);
    return (
        <>
            <CustomerStatistics data={data} />
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
                                {filteredData(data, searchText).map(
                                    (customer) => (
                                        <Col
                                            xs={24}
                                            sm={12}
                                            md={8}
                                            lg={8}
                                            xl={8}
                                            xxl={6}
                                            key={customer.customer_ID}
                                        >
                                            <CustomerGirdView
                                                customer={customer}
                                                setCustomerData={
                                                    setCustomerData
                                                }
                                                setHoveredCard={setHoveredCard}
                                                setVisible={setVisible}
                                                hoveredCard={hoveredCard}
                                            />
                                        </Col>
                                    )
                                )}
                            </Row>
                        </div>
                    ) : (
                        <Table
                            columns={columnsTable(setData, setVisible)}
                            dataSource={filteredData(data, searchText)}
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
