import {Card, Table} from "antd"
import {useEffect, useState} from "react"

import {getAllHome} from "../../Service/Home//HomeSerivce"
import {columnsTable} from "./HomeExtend"

function Home() {
    const [home, setHome] = useState([])
    useEffect(() => {
        getAllHome().then((value) => {
            setHome(value)
        })
    })

    return (
        <Card>
            <Table
                columns={columnsTable}
                pagination={false}
                scroll={{
                    x: "max-content",
                    y: 80 * 5,
                }}
                dataSource={home}
            />
        </Card>
    )
}
export default Home
