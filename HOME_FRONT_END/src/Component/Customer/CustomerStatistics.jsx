import { Card, Col, Flex, Row, Statistic } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
function CustomerStatistics({ data }) {
    return (
        <Row gutter={16} style={{ marginBottom: "16px" }}>
            <Col span={8}>
                <Card
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.03) 0px 0px 5px 5px",
                    }}
                >
                    <Flex justify='space-between'>
                        <Statistic
                            title='Khách hàng'
                            value={data.length}
                            prefix={
                                <UserOutlined style={{ fontSize: "17px" }} />
                            }
                        />
                        <Statistic
                            title='Hoạt động'
                            value={
                                data.filter(
                                    (customer) =>
                                        customer.customer_Status === "ACTIVE"
                                ).length
                            }
                            prefix={
                                <AntDesignOutlined
                                    style={{
                                        fontSize: 17,
                                        color: "#1890ff", // Active: xanh, Inactive: xám
                                        transition: "all 0.3s ease",
                                    }}
                                />
                            }
                        />
                        <Statistic
                            title='Rời đi'
                            value={
                                data.filter(
                                    (customer) =>
                                        customer.customer_Status === "INACTIVE"
                                ).length
                            }
                            prefix={
                                <AntDesignOutlined
                                    style={{
                                        fontSize: 17,
                                        color: "#d9d9d9", // Active: xanh, Inactive: xám
                                        transition: "all 0.3s ease",
                                    }}
                                />
                            }
                        />
                    </Flex>
                </Card>
            </Col>
        </Row>
    );
} // Thẻ card thống kê

export default CustomerStatistics;
