import { Col, Input, Row, Tag, Button, Dropdown, Space, Modal } from "antd";
import {
    AppstoreAddOutlined,
    DeleteTwoTone,
    EditTwoTone,
    MoreOutlined,
    HomeTwoTone,
    SaveOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import HomeModal from "./HomeModal";
import { addHome, updateHome } from "../../Service/Home/HomeSerivce";
import { useNotification, notify } from "../../assets/NotificationProvider";
const columnsTable = (setVisible) => [
    {
        key: "home_ID",
        title: "ID",
        dataIndex: "home_ID",
        align: "center",
        width: "5rem",

        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "home_Address",
        title: "Địa chỉ",
        dataIndex: "home_Address",
        width: "10rem",
    },
    {
        key: "home_RentalPrice",
        title: "Giá thuê",
        dataIndex: "home_RentalPrice",
        align: "center",
        width: "6rem",
        render: (vallue) => <Tag>{vallue.toLocaleString("vi")}</Tag>,
    },
    {
        key: "home_HostID",
        title: "CCCD Chủ nhà",
        dataIndex: "home_HostID",
        align: "center",
        width: "8rem",
    },
    {
        key: "home_HostName",
        title: "Tên chủ nhà",
        dataIndex: "home_HostName",
        width: "10rem",
    },
    {
        key: "home_HostPhoneNumber",
        title: "Số điện thoại",
        dataIndex: "home_HostPhoneNumber",
        align: "center",
        width: "8rem",
    },
    {
        key: "contract",
        title: "Hợp đồng đến",
        dataIndex: "contract",
        align: "center",
        width: "12rem",
        render: (_, value) =>
            new Date(value.home_ContractFrom).toLocaleDateString("vi") +
            " - " +
            new Date(value.home_ContractTo).toLocaleDateString("vi"),
    },
    {
        key: "home_TotalFloors",
        title: "Số tầng",
        dataIndex: "home_TotalFloors",
        align: "center",
        width: "6rem",
    },

    {
        key: "home_Status",
        title: "Tình trạng",
        dataIndex: "home_Status",
        align: "center",
        width: "7rem",
    },
    {
        key: "action",
        title: "Thao tác",
        dataIndex: "created_at",
        align: "center",
        width: "6rem",
        fixed: "right",

        render: () => <ActionMenu setVisible={setVisible} />,
    },
];
const ActionMenu = ({ setVisible }) => {
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
                <Space>
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

const FormFilter = ({
    searchText,
    setHome,
    onChange,
    setVisible,
    visible,
    homeData,
    setHomeData,
}) => {
    const { openNotification } = useNotification();
    const handleOk = () => {
        if (homeData?.id) {
            updateHome(homeData.id, homeData)
                .then(() => {
                    setVisible(false);
                    setHome((prevData) =>
                        prevData.map((item) =>
                            item.id === homeData.id
                                ? { ...item, ...homeData }
                                : item
                        )
                    );
                    openNotification(
                        "success",
                        "Tin nhắn hệ thống",
                        "Cập nhật nhà cho thuê thành công !"
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
            addHome(homeData)
                .then(() => {
                    setVisible(false);
                    setHome((prevData) => [...prevData, homeData]);
                    openNotification(
                        "success",
                        "Tin nhắn hệ thống",
                        "Thêm mới nhà cho thuê thành công !"
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
            <Row gutter={[24, 24]} style={{ rowGap: "10px" }}>
                <Col xxl={4} xl={6} lg={8}>
                    <Input
                        allowClear
                        onChange={onChange}
                        value={searchText}
                        style={{
                            width: "100%",
                        }}
                        placeholder='Tìm kiếm: ID | Địa chỉ'
                    />
                </Col>
                <Col>
                    <Button
                        icon={
                            <AppstoreAddOutlined style={{ fontSize: "22px" }} />
                        }
                        type='primary'
                        onClick={() => setVisible(true)}
                    />
                </Col>
            </Row>
            <Modal
                style={{ top: "1.3rem" }}
                styles={{
                    header: {
                        padding: "16px 24px",
                        borderBottom: "1px solid #f0f0f0",
                        background: "#fafafa",
                        borderRadius: "8px 8px 0 0",
                        marginBottom: "0",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
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
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            fontWeight: "600",
                            fontSize: "18px",
                            color: "#1d1d1d",
                            flex: 1, // Thêm dòng này để title chiếm hết không gian còn lại
                            paddingRight: "40px", // Tăng khoảng cách để không đè lên nút đóng
                        }}
                    >
                        <HomeTwoTone
                            twoToneColor='#1890ff'
                            style={{ fontSize: "24px" }}
                        />
                        <span>
                            {!homeData?.home_ID
                                ? "TẠO MỚI NHÀ CHO THUÊ"
                                : "CẬP NHẬT NHÀ CHO THUÊ"}
                        </span>
                    </div>
                }
                open={visible}
                onCancel={() => {
                    setVisible(false);
                    setHomeData({});
                }}
                closable={false}
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "16px 24px",
                            borderTop: "1px solid #f0f0f0",
                        }}
                    >
                        {/* Phần bên trái (nếu cần thêm nội dung) */}
                        <div>
                            {/* Có thể thêm text hướng dẫn hoặc icon tại đây */}
                        </div>

                        {/* Nhóm nút hành động */}
                        <Space size='middle'>
                            <Button
                                key='cancel'
                                size='large'
                                style={{
                                    minWidth: "120px",
                                    height: "40px",
                                    borderRadius: "4px",
                                }}
                                onClick={() => {
                                    setVisible(false);
                                    setHomeData({});
                                }}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                key='submit'
                                type='primary'
                                size='large'
                                style={{
                                    minWidth: "120px",
                                    height: "40px",
                                    borderRadius: "4px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                                onClick={handleOk}
                            >
                                {!homeData?.home_ID ? (
                                    <Space>
                                        <PlusOutlined />
                                        Tạo mới
                                    </Space>
                                ) : (
                                    <Space>
                                        <SaveOutlined />
                                        Lưu thay đổi
                                    </Space>
                                )}
                            </Button>
                        </Space>
                    </div>
                }
            >
                <HomeModal homeData={homeData} setHomeData={setHomeData} />
            </Modal>
        </>
    );
};

const actionsCard = () => (
    <Space size={"middle"}>
        <EditTwoTone key='edit' />
        <DeleteTwoTone key='delete' />
    </Space>
);

export { columnsTable, FormFilter, actionsCard };
