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
    Avatar,
} from "antd";
import {
    UserAddOutlined,
    UserOutlined,
    AntDesignOutlined,
    EditTwoTone,
    MoreOutlined,
    DeleteTwoTone,
    EditOutlined,
    SettingOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import {
    addCustomer,
    deleteACustomer,
    updatedCustomer,
} from "../../Service/Customer/CustomerSerive";
import {
    getDistricts,
    getProvinces,
    getWards,
} from "../../Service/Location/LocationSerivce";
import { useEffect, useState } from "react";
import { useNotification, notify } from "../../assets/NotificationProvider";
import dayjs from "dayjs";

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

const ActionMenu = ({ rowData, onDelete, setData, setVisible }) => {
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
const actionsCard = (setVisible) => (
    <Space size={"middle"}>
        <EditTwoTone key='edit' onClick={() => setVisible(true)} />
        <DeleteTwoTone key='delete' />
    </Space>
);

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

const SearchBar = ({
    searchText,
    setSearchText,
    setData,
    visible,
    setVisible,
    customerData,
    setCustomerData,
}) => {
    const { openNotification } = useNotification();

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    const handleOk = () => {
        if (customerData?.id) {
            updatedCustomer(customerData.id, customerData)
                .then(() => {
                    setVisible(false);
                    setData((prevData) =>
                        prevData.map((item) =>
                            item.id === customerData.id
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
                    setVisible(false);
                    setData((prevData) => [...prevData, customerData]);
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
                <Col xs={16} xxl={8}>
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
                        onClick={() => setVisible(true)}
                    />
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
                destroyOnClose={true}
                onCancel={() => {
                    setVisible(false);
                    setCustomerData({});
                }}
            >
                <CustomerForm
                    setCustomerData={setCustomerData}
                    customerData={customerData}
                />
            </Modal>
        </>
    );
}; // Form tìm kiếm + button thêm khách hàng
const CustomerForm = ({ customerData, setCustomerData }) => {
    const [locationData, setLocationData] = useState({
        provinces: [],
        districts: [],
        wards: [],
        selectedProvince: customerData?.customer_Province || null,
        selectedDistrict: customerData?.customer_District || null,
        selectedWard: customerData?.customer_Ward || null,
        loadingProvinces: true,
        loadingDistricts: false,
        loadingWards: false,
    });

    useEffect(() => {
        getProvinces()
            .then((value) => {
                setLocationData((prev) => ({
                    ...prev,
                    provinces: value.data,
                    loadingProvinces: false,
                }));
            })
            .catch(() =>
                setLocationData((prev) => ({
                    ...prev,
                    loadingProvinces: false,
                }))
            );
    }, []);

    useEffect(() => {
        if (customerData?.customer_Province) {
            handleProvinceChange(customerData.customer_Province, false);
        }
    }, [customerData?.customer_Province]);

    useEffect(() => {
        if (customerData?.customer_District) {
            handleDistrictChange(customerData.customer_District, false);
        }
    }, [customerData?.customer_District]);

    const handleChange = (key, value) => {
        setCustomerData((prev) => ({ ...prev, [key]: value }));
    };

    const handleProvinceChange = (provinceId, reset = true) => {
        setLocationData((prev) => ({
            ...prev,
            selectedProvince: provinceId,
            selectedDistrict: reset ? null : prev.selectedDistrict,
            selectedWard: reset ? null : prev.selectedWard,
            districts: reset ? [] : prev.districts,
            wards: reset ? [] : prev.wards,
            loadingDistricts: true,
        }));
        handleChange("customer_Province", provinceId);
        if (reset) {
            handleChange("customer_District", null);
            handleChange("customer_Ward", null);
        }

        getDistricts(provinceId)
            .then((value) =>
                setLocationData((prev) => ({
                    ...prev,
                    districts: value.data,
                    loadingDistricts: false,
                }))
            )
            .catch(() =>
                setLocationData((prev) => ({
                    ...prev,
                    loadingDistricts: false,
                }))
            );
    };

    const handleDistrictChange = async (districtId) => {
        setLocationData((prev) => ({
            ...prev,
            selectedDistrict: districtId,
            selectedWard: null,
            wards: [],
            loadingWards: true,
        }));

        handleChange("customer_District", districtId);
        handleChange("customer_Ward", null);

        try {
            const { data } = await getWards(districtId);
            setLocationData((prev) => ({
                ...prev,
                wards: data,
                loadingWards: false,
            }));

            if (data.length > 0) {
                handleChange("customer_Ward", data[0].id);
            }
        } catch (error) {
            console.error("Lỗi khi lấy phường/xã:", error);
            setLocationData((prev) => ({ ...prev, loadingWards: false }));
        }
    };

    return (
        <Form layout='vertical'>
            {!customerData?.customer_ID && (
                <Form.Item
                    label='Căn cước công dân'
                    rules={[
                        { required: true, message: "Please enter customer ID" },
                    ]}
                >
                    <Input.OTP
                        length={12}
                        value={customerData?.customer_ID || ""}
                        onChange={(value) => handleChange("customer_ID", value)}
                    />
                </Form.Item>
            )}
            <Form.Item
                label='Họ tên'
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
                <Input
                    value={customerData?.customer_Name || ""}
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
                    value={customerData?.customer_PhoneNumber || ""}
                    onChange={(value) =>
                        handleChange("customer_PhoneNumber", value)
                    }
                />
            </Form.Item>

            <Form.Item label='Địa chỉ'>
                <Space direction='vertical' style={{ width: "100%" }}>
                    <Select
                        placeholder='Tỉnh - Thành phố'
                        value={locationData.selectedProvince}
                        loading={locationData.loadingProvinces}
                        onChange={(value) => handleProvinceChange(value)}
                        options={locationData.provinces.map(
                            ({ id, full_name }) => ({
                                key: id,
                                value: id,
                                label: full_name,
                            })
                        )}
                    />
                    <Select
                        placeholder='Quận - Huyện'
                        value={locationData.selectedDistrict}
                        loading={locationData.loadingDistricts}
                        onChange={(value) => handleDistrictChange(value)}
                        options={locationData.districts.map(
                            ({ id, full_name }) => ({
                                key: id,
                                value: id,
                                label: full_name,
                            })
                        )}
                    />
                    <Select
                        placeholder='Phường - Xã'
                        value={
                            locationData.wards.some(
                                (w) => w.id === customerData?.customer_Ward
                            )
                                ? customerData.customer_Ward
                                : null
                        }
                        loading={locationData.loadingWards}
                        onChange={(value) =>
                            handleChange("customer_Ward", value)
                        }
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
                        value={customerData?.customer_Address || ""}
                        onChange={(e) =>
                            handleChange("customer_Address", e.target.value)
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
                    value={
                        customerData?.customer_Date
                            ? dayjs(customerData.customer_Date, "YYYY-MM-DD")
                            : null
                    }
                    onChange={(date) => handleChange("customer_Date", date)}
                />
            </Form.Item>

            <Form.Item label='Tình trạng'>
                <Select
                    value={customerData?.customer_Status || "ACTIVE"}
                    onChange={(value) => handleChange("customer_Status", value)}
                >
                    <Option value='ACTIVE'>Active</Option>
                    <Option value='INACTIVE'>Inactive</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export { columnsTable, SearchBar, NewUsersCard, actionsCard };
