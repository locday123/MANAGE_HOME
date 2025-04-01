import {Col, Input, Row, Tag, Button} from "antd"
import {AppstoreAddOutlined} from "@ant-design/icons"
const columnsTable = [
    {
        key: "home_ID",
        title: "ID",
        dataIndex: "home_ID",
        align: "center",
        width: "6rem",
        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "home_Address",
        title: "Địa chỉ",
        dataIndex: "home_Address",
    },
    {
        key: "home_RentalPrice",
        title: "Giá thuê",
        dataIndex: "home_RentalPrice",
        align: "center",
        width: "1rem",
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
        key: "home_Status",
        title: "Tình trạng",
        dataIndex: "home_Status",
        align: "center",
        width: "7rem",
    },
    {
        key: "created_at",
        title: "Ngày tạo",
        dataIndex: "created_at",
        align: "center",
        render: (value) => new Date(value).toLocaleDateString("vi"),
    },
]

const FormFilter = ({searchText, onChange}) => {
    return (
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
                <Button icon={<AppstoreAddOutlined style={{fontSize: "22px"}} />} type='primary' />
            </Col>
        </Row>
    )
}

export {columnsTable, FormFilter}
