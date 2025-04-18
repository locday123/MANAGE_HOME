import {Input, Row, Col} from "antd"

type CustomerFilterProps = {
    searchValue: string
    onSearchChange: (value: string) => void
}

function CustomerFilter({searchValue, onSearchChange}: CustomerFilterProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value)
    }

    return (
        <Row gutter={16}>
            <Col xxl={4}>
                <Input
                    placeholder='Tìm kiếm khách hàng...'
                    allowClear
                    value={searchValue}
                    onChange={handleChange}
                />
            </Col>
        </Row>
    )
}

export default CustomerFilter
