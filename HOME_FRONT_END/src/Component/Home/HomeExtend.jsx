import {Col, Input, Row, Tag, Button, Dropdown, Space, Modal} from "antd"
import {
    AppstoreAddOutlined,
    DeleteTwoTone,
    EditTwoTone,
    HomeTwoTone,
    MoreOutlined,
} from "@ant-design/icons"
import HomeModal from "./HomeModal"
const columnsTable = [
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

        render: () => <ActionMenu />,
    },
]
const ActionMenu = () => {
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

const FormFilter = ({searchText, onChange, setVisible, visible, homeData, setHomeData}) => {
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
                        <HomeTwoTone />
                        <span>TẠO MỚI NHÀ CHO THUÊ</span>
                    </Space>
                }
                open={visible}
                destroyOnClose={true}
                onCancel={() => {
                    setVisible(false)
                }}
            >
                <HomeModal homeData={homeData} setHomeData={setHomeData} />
            </Modal>
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
