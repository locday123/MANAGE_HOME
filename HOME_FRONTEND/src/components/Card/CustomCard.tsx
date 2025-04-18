import {Card} from "antd"

import {ReactNode} from "react"

type CustomCardProps = {
    title?: ReactNode
    extra?: ReactNode
    children?: ReactNode
}

function CustomCard({title, extra, children}: CustomCardProps) {
    return (
        <Card title={title} extra={extra}>
            {children}
        </Card>
    )
}

export default CustomCard
