import {Input, Row, Col} from "antd"

type HomeFilterProps = {
    searchValue: string
    onSearchChange: (value: string) => void
}

function HomeFilter({searchValue, onSearchChange}: HomeFilterProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value)
    }

    return (
        <Row gutter={16}>
            <Col xxl={4}>
                <Input
                    placeholder='Tìm kiếm nhà...'
                    allowClear
                    value={searchValue}
                    onChange={handleChange}
                />
            </Col>
        </Row>
    )
}

export default HomeFilter
