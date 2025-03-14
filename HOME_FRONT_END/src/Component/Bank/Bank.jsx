import { Avatar, Table } from "antd";
import { useEffect, useState } from "react";

import { getAllBank } from "../../Service/Bank/BankService";

const columns = [
    {
        key: "bankAbbreviated",
        title: "Ngân hàng",
        dataIndex: "bankAbbreviated",
    },
    {
        key: "bankName",
        title: "Tên ngân hàng",
        dataIndex: "bankName",
    },
];

function Bank() {
    const [data, setData] = useState([]);
    const customData = (children) => {
        return children.map((value) => {
            return {
                bankAbbreviated: (
                    <>
                        <Avatar
                            style={{ marginRight: "10px" }}
                            size={30}
                            src={value.icon}
                        />
                        {value.bankAbbreviated}
                    </>
                ),
                bankName: value.bankName,
            };
        });
    };
    useEffect(() => {
        getAllBank().then((value) => {
            setData(value);
        });
    }, [data != null]);

    return (
        <Table
            bordered={true}
            dataSource={customData(data)}
            pagination={false}
            columns={columns}
        />
    );
}

export default Bank;
