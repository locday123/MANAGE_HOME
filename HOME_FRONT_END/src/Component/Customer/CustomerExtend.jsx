import {
    Input,
    Tag,
    Col,
    Row,
    Card,
    Statistic,
    Flex,
    Button,
    Form,
    Modal,
    DatePicker,
    Select,
    Dropdown,
    Space,
} from "antd"
import {
    UserOutlined,
    AntDesignOutlined,
    EditTwoTone,
    InfoCircleTwoTone,
    MoreOutlined,
    DeleteTwoTone,
} from "@ant-design/icons"
import {addCustomer, deleteACustomer} from "../../Service/Customer/CustomerSerive"
import {useState} from "react"
import {useNotification} from "../../assets/NotificationProvider"

const handleDelete = (customerID, setReload) => {
    const notification = useNotification()

    const openNotification = (message, description) => {
        notification.success({
            placement: "bottomRight",
            message: message,
            description: description,
        })
    }
    deleteACustomer(customerID)
        .then(() => {
            openNotification("Thông báo hệ thống", "Xóa khách hàng thành công", "success")
            setReload((prev) => !prev) // ✅ Đúng
        })
        .catch((error) => {
            openNotification("Thông báo hệ thống", "Có lỗi xảy ra", "error")
        })
}

const ActionMenu = ({rowData, onDelete, setReload}) => {
    const items = [
        {
            label: (
                <Space>
                    <EditTwoTone />
                    Chỉnh sửa
                </Space>
            ),
            key: "0",
        },
        {
            label: (
                <Space>
                    <InfoCircleTwoTone />
                    Xem
                </Space>
            ),
            key: "1",
        },
        {
            label: (
                <Space onClick={() => onDelete(rowData.id, setReload)}>
                    <DeleteTwoTone />
                    Xóa
                </Space>
            ),
            key: "2",
        },
    ]

    return (
        <Dropdown menu={{items}} trigger={["click"]} placement='bottomLeft'>
            <MoreOutlined style={{fontSize: "20px", cursor: "pointer"}} />
        </Dropdown>
    )
}

const columnsTable = (setReload) => [
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
        render: (value) => new Date(value).toLocaleDateString("vi-VN"),
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
        render: (value) => new Date(value).toLocaleDateString("vi-VN"),
    },
    {
        key: "action",
        title: "Thao tác",
        align: "center",
        width: "6rem",
        render: (_, rowData) => (
            <ActionMenu rowData={rowData} onDelete={handleDelete} setReload={setReload} />
        ),
    },
]

const NewUsersCard = ({data}) => {
    return (
        <Row gutter={16} style={{marginBottom: "16px"}}>
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
                            prefix={<UserOutlined style={{fontSize: "17px"}} />}
                        />
                        <Statistic
                            title='Hoạt động'
                            value={
                                data.filter((customer) => customer.customer_Status === "ACTIVE")
                                    .length
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
                                data.filter((customer) => customer.customer_Status === "INACTIVE")
                                    .length
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
    )
} // Thẻ card thống kê

const SearchBar = ({searchText, setSearchText}) => {
    const [visible, setVisible] = useState(false)
    const [customerData, setCustomerData] = useState({})
    const notification = useNotification()

    const openNotification = (message, description) => {
        notification.success({
            placement: "bottomRight",
            message: message,
            description: description,
        })
    }
    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }
    const handleOk = () => {
        setVisible(false)
        addCustomer(customerData)
        openNotification("Thông báo hệ thống", "Thêm khách hàng thành công")
    }

    return (
        <>
            <Row gutter={16}>
                <Col span={8}>
                    <Input
                        value={searchText}
                        placeholder='Tên khách hàng | ID (CCCD) | Số điện thoại'
                        onChange={handleSearch}
                        style={{width: "100%", display: "block"}}
                    />
                </Col>

                <Col span={8}>
                    <Button type='primary' onClick={() => setVisible(true)}>
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
    )
} // Form tìm kiếm + button thêm khách hàng
const CustomerForm = ({setCustomerData}) => {
    const handleChange = (key, value) => {
        setCustomerData((prev) => ({...prev, [key]: value}))
    }

    return (
        <Form layout='vertical'>
            <Form.Item
                label='Customer ID'
                rules={[{required: true, message: "Please enter customer ID"}]}
            >
                <Input onChange={(e) => handleChange("customer_ID", e.target.value)} />
            </Form.Item>
            <Form.Item label='Name' rules={[{required: true, message: "Please enter name"}]}>
                <Input onChange={(e) => handleChange("customer_Name", e.target.value)} />
            </Form.Item>
            <Form.Item
                label='Phone Number'
                rules={[{required: true, message: "Please enter phone number"}]}
            >
                <Input onChange={(e) => handleChange("customer_PhoneNumber", e.target.value)} />
            </Form.Item>
            <Form.Item label='Address' rules={[{required: true, message: "Please enter address"}]}>
                <Input onChange={(e) => handleChange("customer_Address", e.target.value)} />
            </Form.Item>
            <Form.Item
                label='Date of Birth'
                rules={[{required: true, message: "Please select date"}]}
            >
                <DatePicker
                    format='YYYY-MM-DD'
                    style={{width: "100%"}}
                    onChange={(date) => handleChange("customer_Date", date)}
                />
            </Form.Item>
            <Form.Item label='Status'>
                <Select onChange={(value) => handleChange("customer_Status", value)}>
                    <Select.Option value='ACTIVE'>Active</Select.Option>
                    <Select.Option value='INACTIVE'>Inactive</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
} // Form thêm khách hàng

export {columnsTable, SearchBar, NewUsersCard}
