import {
    Input,
    Tag,
    Col,
    Row,
    Button,
    Modal,
    Dropdown,
    Space,
    Avatar,
} from "antd";
import {
    UserAddOutlined,
    UserOutlined,
    MoreOutlined,
    DeleteTwoTone,
    EditTwoTone,
} from "@ant-design/icons";
import {
    addCustomer,
    deleteACustomer,
    updatedCustomer,
} from "../../Service/Customer/CustomerService";

import { useNotification, notify } from "../../assets/NotificationProvider";
import CustomerModal from "./CustomerModal";
import CustomModal from "../Extend/Modal/CustomModal";

const handleDelete = (customerID, setCustomer) => {
    deleteACustomer(customerID)
        .then(() => {
            setData((prevData) =>
                prevData.filter(
                    (customer) => customer.customer_ID !== customerID
                )
            );
            notify(
                "success",
                "Xóa thành công",
                `Đã xóa mục có ID: ${customerID}`
            );
        })
        .catch((error) => {
            console.log(error);
        });
};

const ActionMenu = ({ rowData, onDelete, setCustomer, setVisible }) => {
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
                <Space onClick={() => onDelete(rowData.customer_ID, setData)}>
                    <DeleteTwoTone />
                    Xóa
                </Space>
            ),
            key: "2",
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={["click"]} placement='bottomLeft'>
            <MoreOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </Dropdown>
    );
};
const actionsCard = (setVisible) => (
    <Space size={"middle"}>
        <EditTwoTone key='edit' onClick={() => setVisible(true)} />
        <DeleteTwoTone key='delete' />
    </Space>
);

const columnsTable = (setCustomer, setVisible) => [
    {
        key: "customer_ID",
        title: "CCCD | ID",
        dataIndex: "customer_ID",
        align: "center",
        width: "6rem",
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
        key: "customer_Sex",
        title: "Giới tính",
        dataIndex: "customer_Sex",
        align: "center",
        width: "5rem",
        render: (value) => (value ? "Nam" : "Nữ"),
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
                setCustomer={setCustomer}
                setVisible={setVisible}
            />
        ),
    },
];

const SearchBar = ({
    searchText,
    setSearchText,
    setCustomer,
    visible,
    setVisible,
    customerData,
    setCustomerData,
    isEdit,
    setIsEdit,
}) => {
    const { openNotification } = useNotification();

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    const handleOk = () => {
        if (isEdit) {
            updatedCustomer(customerData.customer_ID, customerData)
                .then(() => {
                    setCustomerData({});
                    setVisible(false);
                    setIsEdit(false);
                    setCustomer((prevData) =>
                        prevData.map((item) =>
                            item.customer_ID === customerData.customer_ID
                                ? { ...item, ...customerData }
                                : item
                        )
                    );

                    openNotification(
                        "success",
                        "Tin nhắn hệ thống",
                        "Cập nhật khách hàng thành công!"
                    );
                })
                .catch(() =>
                    openNotification(
                        "error",
                        "Tin nhắn hệ thống",
                        "Lỗi khi cập nhật"
                    )
                );
        } else {
            addCustomer(customerData)
                .then(() => {
                    setCustomerData({});
                    setVisible(false);
                    setIsEdit(false);
                    setCustomer((prevData) => {
                        const newCustomer = {
                            ...customerData,
                            created_at: new Date().toISOString().split("T")[0], // Format: yyyy-mm-dd
                        };

                        if (Array.isArray(prevData)) {
                            return [...prevData, newCustomer];
                        }

                        return [newCustomer];
                    });

                    openNotification(
                        "success",
                        "Tin nhắn hệ thống",
                        "Thêm khách hàng thành công"
                    );
                })
                .catch(() =>
                    openNotification(
                        "error",
                        "Tin nhắn hệ thống",
                        "Lỗi khi thêm mới"
                    )
                );
        }
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xxl={4} xl={6} lg={8}>
                    <Input
                        value={searchText}
                        placeholder='Tên khách hàng | ID (CCCD) | Số điện thoại'
                        onChange={handleSearch}
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col span={1}>
                    <Button
                        icon={<UserAddOutlined style={{ fontSize: "22px" }} />}
                        type='primary'
                        onClick={() => {
                            setVisible(true), setIsEdit(false);
                        }}
                    />
                </Col>
            </Row>

            <CustomModal
                visible={visible}
                setVisible={setVisible}
                data={customerData}
                setData={setCustomerData}
                handleOk={handleOk}
                entityName='KHÁCH THUÊ NHÀ'
                titleIcon={<UserOutlined style={{ fontSize: "24px" }} />}
                idField='customer_ID'
                isEdit={isEdit}
            >
                <CustomerModal
                    isEdit={isEdit}
                    setCustomerData={setCustomerData}
                    customerData={customerData}
                />
            </CustomModal>
        </>
    );
}; // Form tìm kiếm + button thêm khách hàng

const filteredData = (data, searchText) => {
    if (!Array.isArray(data)) return [];

    const filterValue = data.filter((item) => {
        const filterName = item.customer_Name
            ?.toLowerCase()
            .includes(searchText.toLowerCase());
        const filterID = item.customer_ID?.toString().includes(searchText);
        const filterPhoneNumber = item.customer_PhoneNumber
            ?.toString()
            .includes(searchText);
        return filterName || filterID || filterPhoneNumber;
    });

    return filterValue;
};

export { columnsTable, SearchBar, actionsCard, filteredData };
