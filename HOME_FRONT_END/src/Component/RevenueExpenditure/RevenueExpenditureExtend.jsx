import { Checkbox, Col, DatePicker, Input, Row, Tag } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const rangePresets = [
    {
        label: "7 ngày qua",
        value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
        label: "14 ngày qua",
        value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
        label: "30 ngày qua",
        value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
        label: "90 ngày qua",
        value: [dayjs().add(-90, "d"), dayjs()],
    },
];
const columnsTable = [
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
];

const FormFilter = ({
    filters,
    handleSearchChange,
    handleFilterChange,
    handleDateChange,
}) => (
    <Row gutter={[24, 24]} style={{ rowGap: "10px" }}>
        <Col span={5}>
            <Input
                onChange={handleSearchChange}
                allowClear
                style={{
                    width: "100%",
                }}
                placeholder='Tìm kiếm: Số tài khoản | Hợp đồng | Mã thu chi'
            />
        </Col>
        <Col
            style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                alignContent: "center",
            }}
        >
            <Checkbox.Group
                options={[
                    { label: "Phiếu thu", value: "THU" },
                    { label: "Phiếu chi", value: "CHI" },
                ]}
                value={filters.filterType}
                onChange={handleFilterChange}
            />
        </Col>
        <Col span={8}>
            <RangePicker
                presets={rangePresets}
                format='DD/MM/YYYY'
                onChange={(dates, dateStrings) =>
                    handleDateChange(dates, dateStrings)
                }
                value={
                    filters.dateRange.length
                        ? [
                              dayjs(filters.dateRange[0], "DD/MM/YYYY"),
                              dayjs(filters.dateRange[1], "DD/MM/YYYY"),
                          ]
                        : null
                }
                allowClear
            />
        </Col>
    </Row>
);

export { FormFilter, columnsTable };
