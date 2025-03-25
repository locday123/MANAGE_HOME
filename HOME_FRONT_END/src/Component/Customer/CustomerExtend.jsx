import {
    Input,
    Tag,
    Col,
    Row,
    Card,
    Statistic,
    Flex,
    Button,
    Switch,
    Space,
} from "antd";
import {
    UserOutlined,
    AntDesignOutlined,
    EditFilled,
    DeleteFilled,
} from "@ant-design/icons";

const columnsTable = [
    {
        key: "customer_ID",
        title: "CCCD | ID",
        dataIndex: "customer_ID",
        align: "center",
        width: "1rem",
        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "customer_Name",
        title: "Tên khách hàng",
        dataIndex: "customer_Name",
        width: "12rem",
    },
    {
        key: "customer_PhoneNumber",
        title: "Số điện thoại",
        dataIndex: "customer_PhoneNumber",
        align: "center",
        width: "9rem",
        render: (value) => <Tag color='success'>{value}</Tag>,
    },
    {
        key: "customer_Address",
        title: "Địa chỉ",
        dataIndex: "customer_Address",
        width: "12rem",
    },
    {
        key: "customer_Date",
        title: "Ngày sinh",
        dataIndex: "customer_Date",
        align: "center",
        width: "6rem",
    },
    {
        key: "customer_Status",
        title: "Trạng thái",
        dataIndex: "customer_Status",
        align: "center",
        width: "8rem",
        render: (value) => <Switch value={value} />,
    },
    {
        key: "date_Add",
        title: "Ngày",
        dataIndex: "date_Add",
        align: "center",
        width: "6rem",
    },

    {
        key: "action",
        title: "Action",
        dataIndex: "action",
        align: "center",
        width: "6rem",
        render: (_, value) => (
            <Space>
                <EditFilled style={{ color: "color='#1677ff'" }} />
                <DeleteFilled color='#1677ff' />
            </Space>
        ),
    },
];

const SearchBar = ({ searchText, setSearchText }) => {
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <Row gutter={16}>
            <Col span={8}>
                <Input
                    value={searchText}
                    placeholder='Tên khách hàng | ID (CCCD) | Số điện thoại'
                    onChange={handleSearch}
                    style={{ width: "100%", display: "block" }}
                />
            </Col>

            <Col span={8}>
                <Button type='primary'>Thêm khách hàng</Button>
            </Col>
        </Row>
    );
};

const NewUsersCard = ({ data }) => {
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
                                        customer.customer_Status === "TRUE"
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
                                        customer.customer_Status === "FALSE"
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
};

export { columnsTable, SearchBar, NewUsersCard };
