import {Card, Carousel, Col, Row, Grid, Image, Flex} from "antd"
import {useEffect, useState} from "react"
import classnames from "classnames/bind"
import style from "../Finance/Finance.module.scss"
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons"
import {getAllBank, getBankID} from "../../Service/Bank/BankService"
import {getAllFinance, getFinanceID} from "../../Service/Finance/FinanceService"
import {slidesToShow} from "../../assets/ExtendedData"

const {useBreakpoint} = Grid
const cx = classnames.bind(style)

function Finance() {
    const [finance, setFinance] = useState([])
    const [bank, setBank] = useState([])
    const [showHide, setShowHide] = useState({})
    const screens = useBreakpoint()
    const MoneyShowHide = (value) => {
        setShowHide({...showHide, [value]: !showHide[value]})
    }
    const NewBank = (bank, code) => {
        const newBank = getBankID(bank, code)
        return newBank
    }
    console.log(showHide)
    useEffect(() => {
        getAllFinance().then((value) => {
            setFinance(value)
        })

        getAllBank().then((value) => {
            setBank(value)
        })
    }, [finance != null])

    return (
        <Carousel
            {...slidesToShow(screens)}
            style={{backgroundColor: "#f4f7fe"}}
            infinite={true}
            dots={false}
            arrows
        >
            {finance.map((value) => (
                <Col span={23} style={{backgroundColor: "#f4f7fe"}}>
                    <Card
                        size='small'
                        title={
                            <Image
                                width={"100px"}
                                preview={false}
                                size={40}
                                src={NewBank(bank, value.bank_Code).bank_Logo}
                            />
                        }
                        className={cx("card-style")}
                        variant={"outlined"}
                    >
                        <Row>
                            <Col span={24}>{value.bank_AccountName.toUpperCase()}</Col>
                            <Col span={24} style={{fontWeight: "lighter", color: "#0b5080"}}>
                                {value.bank_AccountNumber}
                            </Col>
                            <Col span={24} style={{fontSize: "20px", color: "#0b5080"}}>
                                <Flex justify='space-between' align='baseline'>
                                    <span style={{alignItems: "center"}} key={"a"}>
                                        {showHide[value.bank_AccountNumber]
                                            ? (1000000).toLocaleString("vi")
                                            : "*******"}
                                    </span>
                                    <span onClick={() => MoneyShowHide(value.bank_AccountNumber)}>
                                        {showHide[value.bank_AccountNumber] ? (
                                            <EyeOutlined />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )}
                                    </span>
                                </Flex>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Carousel>
    )
}

export default Finance
