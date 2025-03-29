import { Card, Col, Grid, Pagination, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
const { useBreakpoint } = Grid;

import {
    SearchBar,
    columnsTable,
    NewUsersCard,
} from "../Customer/CustomerExtend";
import { getAllCustomer } from "../../Service/Customer/CustomerSerive";

function Customer() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isGridView, setIsGridView] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const screens = useBreakpoint();

    const pageSize = isGridView
        ? screens.xxl
            ? 4
            : screens.xl
            ? 3
            : screens.md
            ? 3
            : screens.sm
            ? 2
            : 1
        : 5;

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
    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
                        setIsGridView={setIsGridView}
                    />
                }
                extra={
                    <Pagination
                        current={currentPage}
                        simple={{ readOnly: true }}
                        pageSize={pageSize}
                        total={filteredData.length}
                        onChange={(page) => setCurrentPage(page)}
                    />
                }
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.03) 0px 0px 5px 5px",
                    maxHeight: "20rem",
                    overflowY: "auto",
                }}
            >
                {isGridView ? (
                    <div style={{ padding: "16px" }}>
                        <Row gutter={[16, 16]}>
                            {paginatedData.map((customer) => (
                                <Col
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    lg={8}
                                    xl={8}
                                    xxl={6}
                                    key={customer.customer_ID}
                                >
                                    <div
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "16px",
                                            borderRadius: "8px",
                                            backgroundColor: "#fff",
                                            boxShadow:
                                                "rgba(0, 0, 0, 0.03) 0px 0px 5px 5px",
                                        }}
                                    >
                                        <p>
                                            <strong>ID:</strong>{" "}
                                            {customer.customer_ID}
                                        </p>
                                        <p>
                                            <strong>Tên:</strong>{" "}
                                            {customer.customer_Name}
                                        </p>
                                        <p>
                                            <strong>Điện thoại:</strong>{" "}
                                            <Tag color='success'>
                                                {customer.customer_PhoneNumber}
                                            </Tag>
                                        </p>
                                        <p>
                                            <strong>Địa chỉ:</strong>{" "}
                                            {customer.customer_Address}
                                        </p>
                                        <p>
                                            <strong>Ngày sinh:</strong>{" "}
                                            {new Date(
                                                customer.customer_Date
                                            ).toLocaleDateString("vi-VN")}
                                        </p>
                                        <p>
                                            <strong>Trạng thái:</strong>{" "}
                                            {customer.customer_Status}
                                        </p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ) : (
                    <Table
                        columns={columnsTable(setData)}
                        dataSource={paginatedData}
                        pagination={false} // Ẩn pagination mặc định
                    />
                )}
            </Card>
        </>
    );
}
export default Customer;
