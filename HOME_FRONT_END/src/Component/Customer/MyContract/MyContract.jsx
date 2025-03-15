import {Card, Col, Collapse, Row, Tag} from "antd"
import {CheckCircleFilled, SyncOutlined} from "@ant-design/icons"
import {useEffect, useState} from "react"

import {ContractInfo, ExpensesTable} from "./ContractInfo"
import {client} from "../../../Service/Service"
import {getBankID} from "../../../Service/Bank/BankService"

const api_contractData = "https://mocki.io/v1/471c8fc8-51c3-4cb0-a721-d2f1f55541b4"

function MyContract() {
    const [data, setData] = useState([])

    const CollapseData = (children) => [
        {
            key: "1",
            label: <b style={{color: "white"}}>THÔNG TIN HỢP ĐỒNG</b>,
            children: ContractInfo(children.contract_rentInfo),
        },
        {
            key: "2",
            label: <b style={{color: "white"}}>THÔNG TIN CĂN HỘ</b>,
            children: ContractInfo(children.home_rentInfo.home_Info),
        },
        {
            key: "3",
            label: <b style={{color: "white"}}>HÓA ĐƠN TIỀN NHÀ</b>,
            children: (
                <Collapse
                    bordered={false}
                    size='small'
                    items={children.bill_HomeRent.map((value) => {
                        return {
                            label: value.statusBill ? (
                                <Tag
                                    bordered={false}
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bolder",
                                    }}
                                    icon={<CheckCircleFilled />}
                                    color='success'
                                >
                                    {value.label}
                                </Tag>
                            ) : (
                                <Tag
                                    bordered={false}
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bolder",
                                    }}
                                    icon={<SyncOutlined spin />}
                                    color='processing'
                                >
                                    {value.label}
                                </Tag>
                            ),
                            children: ExpensesTable(value),
                        }
                    })}
                />
            ),
        },
    ]

    useEffect(() => {
        client.get(api_contractData).then((value) => {
            setData(value.data)
        })
    }, [data != null])

    return (
        <Row style={{rowGap: "20px"}}>
            {data.map((value, key) => (
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
