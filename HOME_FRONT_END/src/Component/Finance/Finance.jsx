import {Card, Carousel, Col, Row, Grid} from "antd"
import Column from "antd/es/table/Column"
import {useEffect, useState} from "react"
import classnames from "classnames/bind"
import style from "../Finance/Finance.module.scss"

import {getAllBank} from "../../Service/Bank/BankService"
import {getAllFinance} from "../../Service/Finance/FinanceService"
import {slidesToShow} from "../../assets/ExtendedData"

const {useBreakpoint} = Grid
const cx = classnames.bind(style)

function Finance() {
    const [finnance, setFinance] = useState([])
    const screens = useBreakpoint()
    console.log(screens)
    useEffect(() => {
        getAllFinance().then((value) => {
            setFinance(value)
        })
    }, [finnance != null])

    return (
        <Card className={cx("card-style")}>
            <Carousel arrows={true} {...slidesToShow(screens)} dots={false}>
                {finnance.map((value) => (
                    <Col span={23}>
                        <Card
                            variant={"borderless"}
                            style={{
                                backgroundImage:
                                    "linear-gradient(to top, #cc208e 0%, #6713d2 100%)",
                                height: "8rem",
                                color: "white",
                            }}
                        >
                            {value.bank_Code}
                        </Card>
                    </Col>
                ))}
            </Carousel>
        </Card>
    )
}

export default Finance
