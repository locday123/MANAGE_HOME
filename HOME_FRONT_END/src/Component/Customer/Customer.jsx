import { Card, Table, Form } from "antd";
import { useEffect, useState } from "react";

import {
    SearchBar,
    columnsTable,
    NewUsersCard,
} from "../Customer/CustomerExtend";
import { getAllCustomer } from "../../Service/Customer/CustomerSerive";

function Customer() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [customerData, setCustomerData] = useState({});

    const filteredData = data.filter((item) => {
        const filterName = item.customer_Name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        const filterID = item.customer_ID.toString().includes(searchText);
        const filterPhoneNumber = item.customer_PhoneNumber
            .toString()
            .includes(searchText);
        return filterName || filterID || filterPhoneNumber;
    }); // Tìm kiếm Customer

    useEffect(() => {
        getAllCustomer().then((value) => {
            setData(value);
        });
    }, [data != null]);

    return (
        <>
            <NewUsersCard data={data} />
            <Card
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.03) 0px 0px 5px 5px",
                }}
                title={
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                }
            >
                <Table
                    columns={columnsTable}
                    dataSource={filteredData}
                    pagination={false}
                ></Table>
            </Card>
        </>
    );
}
export default Customer;
