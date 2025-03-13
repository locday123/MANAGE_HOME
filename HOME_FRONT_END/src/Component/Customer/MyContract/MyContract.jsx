import {Button, Card, Col, Collapse, Row, Table, Tag} from "antd"
import {EditOutlined, SearchOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons"
import {ContractInfo, ExpensesTable} from "./ContractInfo"

const contractData = [
    {
        id_rent: "HDS-26022025-001",
        contract_rentInfo: [
            {label: "Người thuê:", name: "Hoàng Xuân Lộc", key: "1"},
            {label: "CCCD", name: "197322197", key: "2"},
            {label: "Số điện thoại", name: "0374536393", key: "3"},
            {label: "Phí hợp đồng", name: 0, key: "4"},
            {label: "Hiệu lực", name: "12/03/20225 - 12/03/2026", key: "5"},
        ],

        home_rentInfo: [
            {label: "Tòa nhà:", name: "672 Lê Hồng Phong", key: "1"},
            {label: "Tầng", name: "4", key: "2"},
            {label: "Phòng", name: "A401", key: "3"},
            {label: "Số người ở", name: 2, key: "8"},
            {label: "Phí thuê", name: (10000000).toLocaleString("vi"), key: "4"},
            {label: "Phí cọc", name: (10000000).toLocaleString("vi"), key: "5"},
            {label: "Phí điện", name: (4000).toLocaleString("vi"), key: "6"},
            {label: "Phí nước", name: (100000).toLocaleString("vi"), key: "7"},

            {label: "Tình trạng", name: "ĐÃ KÍCH HOẠT", key: "9"},
        ],
        bill_HomeRent: [
            {
                label: "CHI PHÍ THUÊ NHÀ THÁNG 1",
                bill_Detail: [
                    {key: "1", Expenses: "Tiền nhà", oldIndex: 0, newIndex: 1, price: 10000000},
                    {
                        key: "1",
                        Expenses: "Chi phí sử dụng điệaaan",
                        oldIndex: 100,
                        newIndex: 200,
                        price: 4000,
                    },
                    {
                        key: "1",
                        Expenses: "Chi phí sử dụng nước",
                        oldIndex: 0,
                        newIndex: 1,
                        price: 100000,
                    },
                    {
                        key: "1",
                        Expenses: "Chi phí xe",
                        oldIndex: 0,
                        newIndex: 2,
                        price: 100000,
                    },
                ],
            },
            {
                label: "CHI PHÍ THUÊ NHÀ THÁNG 2",
                bill_Detail: [
                    {key: "1", Expenses: "Tiền nhà", oldIndex: 0, newIndex: 1, price: 10000000},
                    {
                        key: "1",
                        Expenses: "Chi phí sử dụng điện",
                        oldIndex: 100,
                        newIndex: 200,
                        price: 4000,
                    },
                    {
                        key: "1",
                        Expenses: "Chi phí sử dụng nước",
                        oldIndex: 0,
                        newIndex: 1,
                        price: 100000,
                    },
                    {
                        key: "1",
                        Expenses: "Chi phí xe",
                        oldIndex: 0,
                        newIndex: 2,
                        price: 100000,
                    },
                ],
            },
        ],
    },
]

function MyContract() {
    const CollapseData = (children) => [
        {
            key: "1",
            label: <b style={{color: "white"}}>THÔNG TIN HỢP ĐỒNG</b>,
            children: ContractInfo(children.contract_rentInfo),
        },
        {
            key: "2",
            label: <b style={{color: "white"}}>THÔNG TIN CĂN HỘ</b>,
            children: ContractInfo(children.home_rentInfo),
        },
        {
            key: "3",
            label: <b style={{color: "white"}}>HÓA ĐƠN TIỀN NHÀ</b>,
            children: (
                <Collapse
                    size='small'
                    {...children.bill_HomeRent.map((value) => {
                        item: {
                            label: value.label
                        }
                    })}
                />
            ),
        },
    ]

    return (
        <Row style={{rowGap: "20px"}}>
            {contractData.map((value, key) => (
                <Col span={24} key={key}>
                    <Card
                        size='small'
                        variant='outlined'
                        title={
                            <Tag bordered style={{fontSize: "16px"}}>
                                {value.id_rent}
                            </Tag>
                        }
                        style={{
                            width: "100%",
                        }}
                    >
                        <Collapse
                            style={{backgroundColor: "#fda849"}}
                            size='small'
                            items={CollapseData(value)}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default MyContract
