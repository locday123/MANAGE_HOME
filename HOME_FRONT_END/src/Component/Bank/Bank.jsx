import {Avatar, Button, Col, Form, Image, Input, Row, Table, Tag} from "antd"
import {useEffect, useState} from "react"
import classnames from "classnames/bind"
import style from "../Bank/Bank.module.scss"

import {getAllBank} from "../../Service/Bank/BankService"

const cx = classnames.bind(style)

const columns = [
    {
        key: "bank_Code",
        title: "Mã ngân hàng",
        dataIndex: "bank_Code",
        align: "center",
    },
    {
        key: "bank_shortName",
        title: "Tên mã ngân hàng",
        dataIndex: "bank_shortName",
        render: (_, value) => (
            <>
                <Image
                    width={"100px"}
                    preview={false}
                    style={{marginRight: "10px"}}
                    size={50}
                    src={value.bank_Logo}
                />
                <Tag color='blue-inverse' style={{fontSize: "13px"}}>
                    {value.bank_shortName}
                </Tag>
            </>
        ),
    },
    {
        key: "bankName",
        title: "Tên ngân hàng",
        dataIndex: "bankName",
    },
]

function Bank() {
    const [data, setData] = useState([])

    useEffect(() => {
        getAllBank().then((value) => {
            setData(value)
        })
    }, [data != null])

    return (
        <Row gutter={20} className={cx("div-bank")}>
            <Col xl={8} md={24}>
                <Form.Item
                    name='bankAbbreviated'
                    rules={[{required: true, message: "Vui lòng nhập tên viết tắt!"}]}
                >
                    <Input size='large' name='bankAbbreviated' />
                </Form.Item>
            </Col>
            <Col xl={8} md={24}>
                <Form.Item
                    name='bankName'
                    rules={[{required: true, message: "Vui lòng nhập tên ngân hàng!"}]}
                >
                    <Input prefix='đá' size='large' name='bankName' />
                </Form.Item>
            </Col>
            <Col xl={8} md={24}>
                <Button type='primary' size='large' children='THÊM' />
            </Col>
            <Col span='24'>
                <Table bordered={true} dataSource={data} pagination={false} columns={columns} />
            </Col>
        </Row>
    )
}

export default Bank
