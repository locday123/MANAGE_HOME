import {Card} from "antd"

function CustomCard({title, extra, children}) {
    return (
        <Card
            title={title}
            extra={extra}
            style={{
                boxShadow: "rgba(0, 0, 0, 0.03) 0px 0px 5px 5px",
            }}
        >
            {children}
        </Card>
    )
}

export default CustomCard
