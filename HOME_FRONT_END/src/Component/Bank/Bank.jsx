import {Card, Table} from "antd"
import {useEffect, useState} from "react"
import classnames from "classnames/bind"
import style from "../Bank/Bank.module.scss"

import {getAllBank} from "../../Service/Bank/BankService"
import {FormAddBank, columnsTable} from "./BankExtend"

const cx = classnames.bind(style)

function Bank() {
    const [data, setData] = useState([])

    useEffect(() => {
        getAllBank().then((value) => {
            setData(value)
        })
    }, [data != null])

    return (
        <Card title={<FormAddBank />} className={cx("div-bank")}>
            <Table
                showHeader={false}
                dataSource={data}
                pagination={{position: ["topRight"]}}
                columns={columnsTable}
            />
        </Card>
    )
}

export default Bank
