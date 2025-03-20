import {Card, Table, Tag} from "antd"
import {useEffect, useState} from "react"
import dayjs from "dayjs"

import {getAllRevExpenditure} from "../../Service/RevenueExpenditure/RevenueExpenditureService"
import {FormFilter} from "./RevenueExpenditureExtend"

const columns = [
    {
        key: "revenueExpenditure_ID",
        title: "Mã thu chi",
        dataIndex: "revenueExpenditure_ID",
        align: "center",
        width: "7rem",
        fixed: "left",
    },
    {
        key: "revenueExpenditureType_ID",
        title: "Loại",
        dataIndex: "revenueExpenditureType_ID",
        align: "center",
        width: "10rem",
    },
    {
        key: "revenueExpenditure_Method",
        title: "Phương thức",
        dataIndex: "revenueExpenditure_Method",
        align: "center",
        width: "10rem",
    },
    {
        key: "payment_ScheduleID",
        title: "Hợp đồng",
        dataIndex: "payment_ScheduleID",
        align: "center",
        width: "12rem",
        render: (value) => <Tag color='#2179fc'>{value}</Tag>,
    },
    {
        key: "bank_AccountID",
        title: "Tài khoản",
        dataIndex: "bank_AccountID",
        align: "center",
        width: "9rem",

        render: (value) => <Tag color='#3c5a97'>{value}</Tag>,
    },
    {
        key: "THU",
        title: "Thu",
        dataIndex: "THU",
        align: "center",
        width: "10rem",
        render: (_, value) => (
            <b>
                {value.revenueExpenditure_Form === "THU"
                    ? Number(value.amountReceived_Amount).toLocaleString("vi")
                    : 0}
            </b>
        ),
    },
    {
        key: "CHI",
        title: "Chi",
        dataIndex: "CHI",
        align: "center",
        width: "10rem",
        render: (_, value) => (
            <b>
                {value.revenueExpenditure_Form === "CHI"
                    ? Number(value.amountReceived_Amount).toLocaleString("vi")
                    : 0}
            </b>
        ),
    },
    {
        key: "revenueExpenditure_Content",
        title: "Ghi chú",
        dataIndex: "revenueExpenditure_Content",
        width: "12rem",
    },
    {
        key: "date_Add",
        title: "Ngày",
        dataIndex: "date_Add",
        align: "center",
        width: "10rem",
    },
    {
        key: "action",
        title: "Action",
        dataIndex: "action",
        align: "center",
        width: "10rem",
        fixed: "right",
    },
]
function RevenueExpenditure() {
    const [data, setData] = useState([])
    const [filters, setFilters] = useState({searchText: "", filterType: [], dateRange: []})
    const dataFilter = data.filter((item) => {
        const bank_Code = item.bank_AccountID
            .toLowerCase()
            .includes(filters.searchText.toLowerCase())
        const revenueExpenditure_ID = item.revenueExpenditure_ID
            .toLowerCase()
            .includes(filters.searchText.toLowerCase())
        const payment_ScheduleID = item.payment_ScheduleID
            .toLowerCase()
            .includes(filters.searchText.toLowerCase())
        const revenueExpenditure_Form =
            filters.filterType.length > 0
                ? filters.filterType.includes(item.revenueExpenditure_Form)
                : true
        const matchesDate =
            filters.dateRange.length === 2
                ? dayjs(item.date_Add, "DD/MM/YYYY").isAfter(
                      dayjs(filters.dateRange[0], "DD/MM/YYYY").subtract(1, "day")
                  ) &&
                  dayjs(item.date_Add, "DD/MM/YYYY").isBefore(
                      dayjs(filters.dateRange[1], "DD/MM/YYYY").add(1, "day")
                  )
                : true
        return (
            (bank_Code || revenueExpenditure_ID || payment_ScheduleID) &&
            revenueExpenditure_Form &&
            matchesDate
        )
    })
    const handleDateChange = (dates, dateStrings) => {
        setFilters((prev) => ({
            ...prev,
            dateRange: dateStrings[0] && dateStrings[1] ? dateStrings : [],
        }))
    }
    const handleSearchChange = (e) => {
        setFilters((prev) => ({...prev, searchText: e.target.value}))
    }
    const handleFilterChange = (checkedValues) => {
        setFilters((prev) => ({...prev, filterType: checkedValues}))
    }

    useEffect(() => {
        getAllRevExpenditure().then((value) => {
            setData(value)
        })
    }, [data != null])

    return (
        <Card
            title={
                <FormFilter
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    handleSearchChange={handleSearchChange}
                    handleDateChange={handleDateChange}
                />
            }
        >
            <Table
                scroll={{
                    x: "max-content",
                    y: 80 * 5,
                }}
                dataSource={dataFilter}
                columns={columns}
                pagination={false}
                summary={(pagedata) => {
                    let totalThu = 0
                    let totalChi = 0
                    pagedata.forEach(({amountReceived_Amount, revenueExpenditure_Form}) => {
                        totalThu +=
                            revenueExpenditure_Form === "THU" ? Number(amountReceived_Amount) : 0
                        totalChi +=
                            revenueExpenditure_Form === "CHI" ? Number(amountReceived_Amount) : 0
                    })
                    return (
                        <Table.Summary fixed={"bottom"}>
                            <Table.Summary.Cell index={0} align='center'>
                                <b style={{fontSize: "17px"}}>TỔNG</b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={4}></Table.Summary.Cell>
                            <Table.Summary.Cell index={5}></Table.Summary.Cell>
                            <Table.Summary.Cell index={6} align='center'>
                                <b style={{fontSize: "17px"}}>{totalThu.toLocaleString("vi")}</b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={7} align='center'>
                                <b style={{fontSize: "17px"}}>{totalChi.toLocaleString("vi")}</b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={5} align='center'></Table.Summary.Cell>
                        </Table.Summary>
                    )
                }}
            />
        </Card>
    )
}

export default RevenueExpenditure
