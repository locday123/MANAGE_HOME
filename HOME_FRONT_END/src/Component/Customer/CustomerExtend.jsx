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
    Form,
    Modal,
    DatePicker,
    Select,
    notification,
} from "antd";
import {
    UserOutlined,
    AntDesignOutlined,
    MoreOutlined,
} from "@ant-design/icons";

import {
    addCustomer,
    deleteACustomer,
} from "../../Service/Customer/CustomerSerive";
import { useState } from "react";

const [api] = notification.useNotification();
const openNotification = (placement) => {
    api.info({
        message: `Notification`,
        description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        placement,
    });
};

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
    },
    {
        key: "created_at",
        title: "Ngày",
        dataIndex: "created_at",
        align: "center",
        width: "6rem",
    },

    {
        key: "action",
        title: "",
        dataIndex: "action",
        align: "center",
        width: "6rem",
        render: (_, value) => (
            <Space>
                <MoreOutlined
                    style={{ fontSize: "20px" }}
                    onClick={() => deleteACustomer(value.id)}
                />
            </Space>
        ),
    },
];

const newCustomer = {
    customer_ID: "777888999",
    customer_Name: "Phạm Thị D",
    customer_PhoneNumber: "0931112222",
    customer_Address: "101 Đường DEF, Quận 7, TP.HCM",
    customer_Date: "1992-07-22",
    customer_Status: "ACTIVE",
    created_at: "2024-03-27 10:00:00",
};

const SearchBar = ({ searchText, setSearchText }) => {
    const [visible, setVisible] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [form] = Form.useForm();
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    const handleOk = () => {
        setVisible(false);
        addCustomer(customerData);
    };

    return (
        <>
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
                    <Button
                        type='primary'
                        onClick={() => openNotification("bottom")}
                    >
                        Thêm khách hàng
                    </Button>
                </Col>
            </Row>
            <Modal
                title='Customer Form'
                open={visible}
                onOk={handleOk}
                onCancel={() => setVisible(false)}
            >
                <CustomerForm setCustomerData={setCustomerData} />
            </Modal>
        </>
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
};

const CustomerForm = ({ setCustomerData }) => {
    const handleChange = (key, value) => {
        setCustomerData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Form layout='vertical'>
            <Form.Item
                label='Customer ID'
                rules={[
                    { required: true, message: "Please enter customer ID" },
                ]}
            >
                <Input
                    onChange={(e) =>
                        handleChange("customer_ID", e.target.value)
                    }
                />
            </Form.Item>
            <Form.Item
                label='Name'
                rules={[{ required: true, message: "Please enter name" }]}
            >
                <Input
                    onChange={(e) =>
                        handleChange("customer_Name", e.target.value)
                    }
                />
            </Form.Item>
            <Form.Item
                label='Phone Number'
                rules={[
                    { required: true, message: "Please enter phone number" },
                ]}
            >
                <Input
                    onChange={(e) =>
                        handleChange("customer_PhoneNumber", e.target.value)
                    }
                />
            </Form.Item>
            <Form.Item
                label='Address'
                rules={[{ required: true, message: "Please enter address" }]}
            >
                <Input
                    onChange={(e) =>
                        handleChange("customer_Address", e.target.value)
                    }
                />
            </Form.Item>
            <Form.Item
                label='Date of Birth'
                rules={[{ required: true, message: "Please select date" }]}
            >
                <DatePicker
                    format='YYYY-MM-DD'
                    style={{ width: "100%" }}
                    onChange={(date) => handleChange("customer_Date", date)}
                />
            </Form.Item>
            <Form.Item label='Status'>
                <Select
                    onChange={(value) => handleChange("customer_Status", value)}
                >
                    <Select.Option value='ACTIVE'>Active</Select.Option>
                    <Select.Option value='INACTIVE'>Inactive</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export { columnsTable, SearchBar, NewUsersCard };
