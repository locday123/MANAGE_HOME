import {Button, Card, Col, Collapse, Row, Tag} from "antd"

const ContractInfo = (info) => {
    console.log(info)
    return (
        <Row gutter={40} style={{rowGap: "10px"}}>
            {info.map((value, key) => (
                <Col xs={24} md={8} key={key}>
                    <Tag color='#108ee9' bordered style={{fontSize: "16px"}}>
                        {value.label}
                    </Tag>
                    {value.name}
                </Col>
            ))}
        </Row>
    )
}

export {ContractInfo}
