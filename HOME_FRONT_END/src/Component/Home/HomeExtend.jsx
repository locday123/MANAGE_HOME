const columnsTable = [
    {
        key: "home_ID",
        title: "ID",
        dataIndex: "home_ID",
        align: "center",
        width: "6rem",
    },
    {
        key: "home_Address",
        title: "Địa chỉ",
        dataIndex: "home_Address",
    },
    {
        key: "home_RentalPrice",
        title: "Giá thuê",
        dataIndex: "home_RentalPrice",
        align: "center",
        width: "1rem",
        render: (vallue) => vallue.toLocaleString("vi"),
    },
    {
        key: "home_HostID",
        title: "CCCD Chủ nhà",
        dataIndex: "home_HostID",
        align: "center",
        width: "8rem",
    },
    {
        key: "home_HostName",
        title: "Tên chủ nhà",
        dataIndex: "home_HostName",
    },
    {
        key: "home_HostPhoneNumber",
        title: "Số điện thoại",
        dataIndex: "home_HostPhoneNumber",
        align: "center",
        width: "8rem",
    },
    {
        key: "contract",
        title: "Hợp đồng đến",
        dataIndex: "contract",
        align: "center",
        width: "12rem",
        render: (_, value) => value.home_ContractFrom + " - " + value.home_ContractTo,
    },

    {
        key: "home_Condition",
        title: "Tình trạng",
        dataIndex: "home_Condition",
        align: "center",
        width: "7rem",
    },
    {
        key: "date_Add",
        title: "Ngày",
        dataIndex: "date_Add",
        align: "center",
    },
]

export {columnsTable}
