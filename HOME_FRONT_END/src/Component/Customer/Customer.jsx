import {Card, Table} from "antd"
import {useEffect, useState} from "react"

import {SearchBar, columnsTable} from "../Customer/CustomerExtend"
import {getAllCustomer} from "../../Service/Customer/CustomerSerive"

function Customer() {
    const [data, setData] = useState([])
    const [searchText, setSearchText] = useState("")

    const filteredData = data.filter((item) =>
        item.customer_Name.toLowerCase().includes(searchText.toLowerCase())
    )

    useEffect(() => {
        getAllCustomer().then((value) => {
            setData(value)
        })
    })

    return (
        <>
            <Card title='Số lượng khách hàng' style={{marginBottom: 16}}>
                {filteredData.length} khách hàng
            </Card>
            <Card title={<SearchBar searchText={searchText} setSearchText={setSearchText} />}>
                <Table columns={columnsTable} dataSource={filteredData} pagination={false}></Table>
            </Card>
        </>
    )
}
export default Customer
