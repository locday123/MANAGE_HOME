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
    Segmented,
} from "antd";
import {
    AppstoreOutlined,
    BarsOutlined,
    UserOutlined,
    AntDesignOutlined,
    EditTwoTone,
    InfoCircleTwoTone,
    MoreOutlined,
    DeleteTwoTone,
} from "@ant-design/icons";
import {
    addCustomer,
    deleteACustomer,
} from "../../Service/Customer/CustomerSerive";
import {
    getDistricts,
    getProvinces,
    getWards,
} from "../../Service/Location/LocationSerivce";
import { useEffect, useState } from "react";
import { useNotification, notify } from "../../assets/NotificationProvider";

const handleDelete = (customerID, setData) => {
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

const ActionMenu = ({ rowData, onDelete, setData }) => {
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
                <Space
                    onClick={() =>
                        onDelete(rowData.customer_ID || rowData.id, setData)
                    }
                >
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

const columnsTable = (setData) => [
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
            <ActionMenu
                rowData={rowData}
                onDelete={handleDelete}
                setData={setData}
            />
        ),
    },
];

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
}; // Thẻ card thống kê

const SearchBar = ({ searchText, setSearchText, setData, setIsGridView }) => {
    const [visible, setVisible] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const { openNotification } = useNotification();

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    const handleOk = () => {
        setVisible(false);
        addCustomer(customerData);
        setData((prevData) => [...prevData, customerData]);
        openNotification(
            "success",
            "Tin nhắn hệ thống",
            "Thêm khách hàng thành công"
        );
    };

    return (
        <>
            <Row gutter={16}>
                <Col span={3}>
                    <Segmented
                        onChange={(value) => setIsGridView(value === "Grid")}
                        options={[
                            { value: "List", icon: <BarsOutlined /> },
                            { value: "Grid", icon: <AppstoreOutlined /> },
                        ]}
                        style={{ marginRight: "16px" }}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        value={searchText}
                        placeholder='Tên khách hàng | ID (CCCD) | Số điện thoại'
                        onChange={handleSearch}
                        style={{ width: "100%", display: "block" }}
                    />
                </Col>

                <Col span={3}>
                    <Button type='primary' onClick={() => setVisible(true)}>
                        Thêm khách hàng
                    </Button>
                </Col>
            </Row>
            <Modal
                bodyStyle={{
                    overflowY: "scroll",
                    maxHeight: "calc(100vh - 240px)",
                }}
                title='THÊM KHÁCH THUÊ'
                open={visible}
                onOk={handleOk}
                onCancel={() => setVisible(false)}
            >
                <CustomerForm setCustomerData={setCustomerData} />
            </Modal>
        </>
    );
}; // Form tìm kiếm + button thêm khách hàng
const CustomerForm = ({ setCustomerData }) => {
    const [locationData, setLocationData] = useState({
        provinces: [],
        districts: [],
        wards: [],
        selectedProvince: null,
        selectedDistrict: null,
        selectedWard: null,
        customer_Address: "",
        loading: false,
    });

    const handleChange = (key, value) => {
        setCustomerData((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        getProvinces()
            .then((value) =>
                setLocationData((prev) => ({ ...prev, provinces: value.data }))
            )
            .catch((err) => console.error(err));
    }, []);

    const handleProvinceChange = (provinceId) => {
        setLocationData((prev) => ({
            ...prev,
            selectedProvince: provinceId,
            selectedDistrict: null,
            selectedWard: null,
            districts: [],
            wards: [],
            loading: true,
        }));
        getDistricts(provinceId)
            .then((value) =>
                setLocationData((prev) => ({
                    ...prev,
                    districts: value.data,
                    loading: false,
                }))
            )
            .catch(() =>
                setLocationData((prev) => ({ ...prev, loading: false }))
            );
    };

    const handleDistrictChange = (districtId) => {
        setLocationData((prev) => ({
            ...prev,
            selectedDistrict: districtId,
            selectedWard: null,
            wards: [],
            loading: true,
        }));
        getWards(districtId)
            .then((value) =>
                setLocationData((prev) => ({
                    ...prev,
                    wards: value.data,
                    loading: false,
                }))
            )
            .catch(() =>
                setLocationData((prev) => ({ ...prev, loading: false }))
            );
    };

    const handleAddressChange = (key, value) => {
        setLocationData((prev) => ({ ...prev, [key]: value }));

        const getFullName = (list, id) =>
            list.find((item) => item.id === id)?.full_name || "";

        const fullAddress = `${locationData.customer_Address}, ${getFullName(
            locationData.wards,
            locationData.selectedWard
        )}, ${getFullName(
            locationData.districts,
            locationData.selectedDistrict
        )}
        , ${getFullName(locationData.provinces, locationData.selectedProvince)}`
            .replace(/, ,/g, ",")
            .trim();
        handleChange("customer_Address", fullAddress);
    };

    return (
        <Form layout='vertical'>
            <Form.Item
                label='Căn cước công dân'
                rules={[
                    { required: true, message: "Please enter customer ID" },
                ]}
            >
                <Input.OTP
                    length={12}
                    onChange={(value) => handleChange("customer_ID", value)}
                />
            </Form.Item>
            <Form.Item
                label='Họ tên'
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
                <Input
                    onChange={(e) =>
                        handleChange("customer_Name", e.target.value)
                    }
                />
            </Form.Item>
            <Form.Item
                label='Số điện thoại'
                rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
            >
                <Input.OTP
                    length={10}
                    onChange={(value) =>
                        handleChange("customer_PhoneNumber", value)
                    }
                />
            </Form.Item>

            <Form.Item label='Địa chỉ'>
                <Space direction='vertical' style={{ width: "100%" }}>
                    <Select
                        showSearch
                        placeholder='Tỉnh - Thành phố'
                        loading={locationData.loading}
                        value={locationData.selectedProvince}
                        onChange={(value) => {
                            handleProvinceChange(value);
                        }}
                        options={locationData.provinces.map(
                            ({ id, full_name }) => ({
                                key: id,
                                value: id,
                                label: full_name,
                            })
                        )}
                    />
                    <Select
                        showSearch
                        placeholder='Quận - Huyện'
                        disabled={!locationData.districts.length}
                        loading={locationData.loading}
                        value={locationData.selectedDistrict}
                        onChange={(value) => {
                            handleDistrictChange(value);
                        }}
                        options={locationData.districts.map(
                            ({ id, full_name }) => ({
                                key: id,
                                value: id,
                                label: full_name,
                            })
                        )}
                    />
                    <Select
                        showSearch
                        placeholder='Phường - Xã'
                        disabled={!locationData.wards.length}
                        loading={locationData.loading}
                        value={locationData.selectedWard}
                        onChange={(value) => {
                            handleAddressChange("selectedWard", value);
                        }}
                        options={locationData.wards.map(
                            ({ id, full_name }) => ({
                                key: id,
                                value: id,
                                label: full_name,
                            })
                        )}
                    />
                    <Input
                        placeholder='Số nhà - Tên đường'
                        onChange={(e) =>
                            handleAddressChange(
                                "customer_Address",
                                e.target.value
                            )
                        }
                    />
                </Space>
            </Form.Item>

            <Form.Item
                label='Ngày sinh'
                rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
            >
                <DatePicker
                    format='DD/MM/YYYY'
                    style={{ width: "100%" }}
                    onChange={(date) => handleChange("customer_Date", date)}
                />
            </Form.Item>

            <Form.Item label='Tình trạng'>
                <Select
                    onChange={(value) => handleChange("customer_Status", value)}
                >
                    <Option value='ACTIVE'>Active</Option>
                    <Option value='INACTIVE'>Inactive</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export { columnsTable, SearchBar, NewUsersCard };
