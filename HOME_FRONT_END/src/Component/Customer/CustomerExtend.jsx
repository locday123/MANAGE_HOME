import {Input, Tag, Col, Row, Button, Modal, Dropdown, Space, Avatar} from "antd"
import {
    UserAddOutlined,
    UserOutlined,
    EditTwoTone,
    MoreOutlined,
    DeleteTwoTone,
} from "@ant-design/icons"
import {addCustomer, deleteACustomer, updatedCustomer} from "../../Service/Customer/CustomerService"

import {useNotification, notify} from "../../assets/NotificationProvider"
import HomeModal from "./CustomerModal"
import CustomerModal from "./CustomerModal"

const handleDelete = (customerID, setData) => {
    deleteACustomer(customerID)
        .then(() => {
            setData((prevData) =>
                prevData.filter((customer) => customer.customer_ID !== customerID)
            )
            notify("success", "Xóa thành công", `Đã xóa mục có ID: ${customerID}`)
        })
        .catch((error) => {
            console.log(error)
        })
}

const ActionMenu = ({rowData, onDelete, setData, setVisible}) => {
    const items = [
        {
            label: (
                <Space onClick={() => setVisible(true)}>
                    <EditTwoTone />
                    Chỉnh sửa
                </Space>
            ),
            key: "0",
        },
        {
            label: (
                <Space onClick={() => onDelete(rowData.customer_ID || rowData.id, setData)}>
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
const actionsCard = (setVisible) => (
    <Space size={"middle"}>
        <EditTwoTone key='edit' onClick={() => setVisible(true)} />
        <DeleteTwoTone key='delete' />
    </Space>
)

const columnsTable = (setData, setVisible) => [
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
        render: (value) => (
            <Space>
                <Avatar icon={<UserOutlined />} />
                {value}
            </Space>
        ),
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
            <ActionMenu
                rowData={rowData}
                onDelete={handleDelete}
                setData={setData}
                setVisible={setVisible}
            />
        ),
    },
]

const SearchBar = ({
    searchText,
    setSearchText,
    setData,
    visible,
    setVisible,
    customerData,
    setCustomerData,
}) => {
    const {openNotification} = useNotification()

    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }
    const handleOk = () => {
        if (customerData?.id) {
            updatedCustomer(customerData.id, customerData)
                .then(() => {
                    setVisible(false)
                    setData((prevData) =>
                        prevData.map((item) =>
                            item.id === customerData.id ? {...item, ...customerData} : item
                        )
                    )
                    openNotification(
                        "success",
                        "Tin nhắn hệ thống",
                        "Cập nhật khách hàng thành công!"
                    )
                })
                .catch(() => openNotification("error", "Tin nhắn hệ thống", "Lỗi khi cập nhật"))
        } else {
            addCustomer(customerData)
                .then(() => {
                    setVisible(false)
                    setData((prevData) => [...prevData, customerData])
                    openNotification("success", "Tin nhắn hệ thống", "Thêm khách hàng thành công")
                })
                .catch(() => openNotification("error", "Tin nhắn hệ thống", "Lỗi khi thêm mới"))
        }
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xxl={4} xl={6} lg={8}>
                    <Input
                        value={searchText}
                        placeholder='Tên khách hàng | ID (CCCD) | Số điện thoại'
                        onChange={handleSearch}
                        style={{width: "100%"}}
                    />
                </Col>
                <Col span={1}>
                    <Button
                        icon={<UserAddOutlined style={{fontSize: "22px"}} />}
                        type='primary'
                        onClick={() => setVisible(true)}
                    />
                </Col>
            </Row>
            <Modal
                style={{top: "1.3rem"}}
                styles={{
                    header: {
                        padding: "15px 0px",
                        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.03)",
                    },
                    body: {
                        overflowY: "scroll",
                        maxHeight: "calc(100vh - 11.5rem)",
                        padding: "10px 20px 10px 10px",
                    },
                }}
                width={{
                    xs: "90%",
                    sm: "80%",
                    md: "70%",
                    lg: "60%",
                    xl: "50%",
                    xxl: "40%",
                }}
                title={
                    <Space style={{fontSize: "20px"}}>
                        <UserOutlined />
                        <span>THÊM KHÁCH THUÊ NHÀ</span>
                    </Space>
                }
                open={visible}
                onOk={handleOk}
                destroyOnClose={true}
                onCancel={() => {
                    setVisible(false)
                    setCustomerData({})
                }}
            >
                <CustomerModal setCustomerData={setCustomerData} customerData={customerData} />
            </Modal>
        </>
    )
} // Form tìm kiếm + button thêm khách hàng

const filteredData = (data, searchText) => {
    const filterValue = data.filter((item) => {
        const filterName = item.customer_Name.toLowerCase().includes(searchText.toLowerCase())
        const filterID = item.customer_ID.toString().includes(searchText)
        const filterPhoneNumber = item.customer_PhoneNumber.toString().includes(searchText)
        return filterName || filterID || filterPhoneNumber
    })
    return filterValue
} // Tìm kiếm Customer

export {columnsTable, SearchBar, actionsCard, filteredData}
