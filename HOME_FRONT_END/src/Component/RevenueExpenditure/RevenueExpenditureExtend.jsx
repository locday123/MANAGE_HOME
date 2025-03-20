import {Checkbox, Col, DatePicker, Input, Row} from "antd"
import dayjs from "dayjs"
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
]

const FormFilter = ({filters, handleSearchChange, handleFilterChange, handleDateChange}) => (
    <Row gutter={[24, 24]} style={{rowGap: "10px"}}>
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
        <Col style={{border: "1px solid #d9d9d9", borderRadius: "5px", alignContent: "center"}}>
            <Checkbox.Group
                options={[
                    {label: "Phiếu thu", value: "THU"},
                    {label: "Phiếu chi", value: "CHI"},
                ]}
                value={filters.filterType}
                onChange={handleFilterChange}
            />
        </Col>
        <Col span={5}>
            <DatePicker
                presets={rangePresets}
                format='DD/MM/YYYY'
                onChange={(dates, dateStrings) => handleDateChange(dates, dateStrings)}
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
)

export {FormFilter}
