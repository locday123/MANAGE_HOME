import {Button, Card, Col, Collapse, Row, Tag} from "antd"
import {EditOutlined, SearchOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons"
import {ContractInfo} from "./ContractInfo"

const contractData = {
    contractRent: {
        contract_rentInfo: [
            {label: "Người thuê:", name: "Hoàng Xuân Lộc", key: "1"},
            {label: "CCCD", name: "197322197", key: "2"},
            {label: "Số điện thoại", name: "0374536393", key: "3"},
            {label: "Phí hợp đồng", name: 0, key: "4"},
            {label: "Hiệu lực", name: "12/03/20225 - 12/03/2026", key: "5"},
        ],
    },
    homeRent: {
        home_rentInfo: [
            {label: "Tòa nhà:", name: "672 Lê Hồng Phong", key: "1"},
            {label: "Tầng", name: "4", key: "2"},
            {label: "Phòng", name: "A401", key: "3"},
            {label: "Phí thuê", name: "10.000.000", key: "4"},
            {label: "Phí cọc", name: "10.000.000", key: "5"},
            {label: "Phí điện", name: "4000 / chữ", key: "6"},
            {label: "Phí nước", name: "100.000 / người", key: "7"},
            {label: "Tình trạng", name: "ĐÃ KÍCH HOẠT", key: "8"},
        ],
    },
    historyPay: {
        history_payInfo: [
            {label: "Tòa nhà:", name: "672 Lê Hồng Phong", key: "1"},
            {label: "Tầng", name: "4", key: "2"},
            {label: "Phòng", name: "A401", key: "3"},
            {label: "Phí thuê", name: "10.000.000", key: "4"},
            {label: "Phí cọc", name: "10.000.000", key: "5"},
            {label: "Phí điện", name: "4000 / chữ", key: "6"},
            {label: "Phí nước", name: "100.000 / người", key: "7"},
            {label: "Tình trạng", name: "ĐÃ KÍCH HOẠT", key: "8"},
        ],
    },
}

function MyContract() {
    const CollapseData = [
        {
            key: "1",
            label: <b style={{color: "white"}}>THÔNG TIN HỢP ĐỒNG</b>,
            children: ContractInfo(contractData.contractRent.contract_rentInfo),
        },
        {
            key: "2",
            label: <b style={{color: "white"}}>THÔNG TIN CĂN HỘ</b>,
            children: ContractInfo(contractData.homeRent.home_rentInfo),
        },
        {
            key: "3",
            label: <b style={{color: "white"}}>HÓA ĐƠN TIỀN NHÀ</b>,
            children: "HÓA ĐƠN TIỀN NHÀ",
        },
        {
            key: "4",
            label: <b style={{color: "white"}}>LỊCH SỬ THANH TOÁN</b>,
            children: "LỊCH SỬ THANH TOÁN",
        },
    ]
    return (
        <Card
            size='default'
            variant='outlined'
            title={
                <>
                    <Tag color='#fda849' bordered style={{fontSize: "16px"}}>
                        HDS-26022025-001 - ĐÃ KÍCH HOẠT
                    </Tag>
                </>
            }
            style={{
                width: "100%",
            }}
        >
            <Collapse
                style={{backgroundColor: "#fda849"}}
                size='small'
                defaultActiveKey={["1"]}
                items={CollapseData}
            />
        </Card>
    )
}

export default MyContract
