import { Card, Table } from "antd";
import { useEffect, useState } from "react";

import { columnsTable } from "../Customer/CustomerExtend";
import { getAllCustomer } from "../../Service/Customer/CustomerSerive";

function Customer() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAllCustomer().then((value) => {
            setData(value);
        });
    });

    return (
        <Card>
            <Table
                columns={columnsTable}
                dataSource={data}
                pagination={false}
            ></Table>
        </Card>
    );
}
export default Customer;
