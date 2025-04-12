import {Col, Input, Row, Tag, Button, Dropdown, Space, Modal} from "antd"
import {
    AppstoreAddOutlined,
    DeleteTwoTone,
    EditTwoTone,
    MoreOutlined,
    HomeTwoTone,
} from "@ant-design/icons"
import HomeModal from "./HomeModal"
import {addHome, updateHome} from "../../Service/Home/HomeSerivce"
import {useNotification, notify} from "../../assets/NotificationProvider"
import CustomModal from "../Extend/Modal/CustomModal"
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
]
const ActionMenu = ({setVisible}) => {
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
    ]

    return (
        <Dropdown menu={{items}} trigger={["click"]} placement='bottomLeft'>
            <MoreOutlined style={{fontSize: "20px", cursor: "pointer"}} />
        </Dropdown>
    )
}

const FormFilter = ({
    searchText,
    setHome,
    onChange,
    setVisible,
    visible,
    homeData,
    setHomeData,
}) => {
    const {openNotification} = useNotification()
    const handleOk = () => {
        if (homeData?.id) {
            updateHome(homeData.id, homeData)
                .then(() => {
                    setVisible(false)
                    setHome((prevData) =>
                        prevData.map((item) =>
                            item.id === homeData.id ? {...item, ...homeData} : item
                        )
                    )
                    openNotification(
                        "success",
                        "Tin nhắn hệ thống",
                        "Cập nhật nhà cho thuê thành công !"
                    )
                })
                .catch(() => openNotification("error", "Tin nhắn hệ thống", "Lỗi khi cập nhật"))
        } else {
            addHome(homeData)
                .then(() => {
                    setVisible(false)
                    setHome((prevData) => [...prevData, homeData])
                    openNotification(
                        "success",
                        "Tin nhắn hệ thống",
                        "Thêm mới nhà cho thuê thành công !"
                    )
                })
                .catch(() => openNotification("error", "Tin nhắn hệ thống", "Lỗi khi thêm mới"))
        }
    }
    return (
        <>
            <Row gutter={[24, 24]} style={{rowGap: "10px"}}>
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
                        icon={<AppstoreAddOutlined style={{fontSize: "22px"}} />}
                        type='primary'
                        onClick={() => setVisible(true)}
                    />
                </Col>
            </Row>
            <CustomModal
                visible={visible}
                setVisible={setVisible}
                data={homeData}
                setData={setHomeData}
                handleOk={handleOk}
                entityName='NHÀ CHO THUÊ'
                titleIcon={<HomeTwoTone twoToneColor='#1890ff' style={{fontSize: "24px"}} />}
                idField='home_ID'
            >
                <HomeModal homeData={homeData} setHomeData={setHomeData} />
            </CustomModal>
        </>
    )
}

const actionsCard = () => (
    <Space size={"middle"}>
        <EditTwoTone key='edit' />
        <DeleteTwoTone key='delete' />
    </Space>
)

export {columnsTable, FormFilter, actionsCard}
