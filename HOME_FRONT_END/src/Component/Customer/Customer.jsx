import { Col, Row, Segmented, Table } from "antd";
import { useEffect, useState } from "react";

import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import {
    SearchBar,
    columnsTable,
    filteredData,
} from "../Customer/CustomerExtend";
import { getAllCustomer } from "../../Service/Customer/CustomerService";
import CustomerStatistics from "./CustomerStatistics";
import CustomerGirdView from "./CustomerGirdView";
import CustomCard from "../Extend/Card/CustomCard";

function Customer() {
    const [customer, setCustomer] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isGridView, setIsGridView] = useState(false);
    const [visible, setVisible] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    console.log(customerData);

    useEffect(() => {
        getAllCustomer().then((value) => {
            value.status === 200 && setCustomer(value.data);
        });
    }, []);
    return (
        <>
            <CustomerStatistics data={customer} />
            <CustomCard
                title={
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                        setCustomer={setCustomer}
                        visible={visible}
                        setVisible={setVisible}
                        customerData={customerData}
                        setCustomerData={setCustomerData}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
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
                            columns={columnsTable(setCustomer, setVisible)}
                            dataSource={filteredData(customer, searchText)}
                            loading={
                                !Array.isArray(customer) ||
                                customer.length === 0
                            }
                            pagination={false} // Ẩn pagination mặc định
                            onRow={(record) => ({
                                onClick: () => {
                                    setCustomerData(record); // Gán dữ liệu vào form
                                    setIsEdit(true);
                                },
                            })}
                        />
                    )}
                </div>
            </CustomCard>
        </>
    );
}
export default Customer;
