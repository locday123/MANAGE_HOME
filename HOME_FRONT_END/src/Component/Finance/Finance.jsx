import {
    Card,
    Carousel,
    Col,
    Row,
    Grid,
    Image,
    Flex,
    Input,
    Form,
    AutoComplete,
    Space,
} from "antd";
import { useEffect, useState } from "react";
import classnames from "classnames/bind";
import style from "../Finance/Finance.module.scss";
import {
    EyeOutlined,
    EyeInvisibleOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import { getAllBank, getBankID } from "../../Service/Bank/BankService";
import {
    getAllFinance,
    searchFinance,
} from "../../Service/Finance/FinanceService";
import { slidesToShow } from "../../assets/ExtendedData";
import RevenueExpenditure from "../RevenueExpenditure/RevenueExpenditure";

const { useBreakpoint } = Grid;
const cx = classnames.bind(style);
function Finance() {
    const [data, setData] = useState([]);
    const [finance, setFinance] = useState([]);
    const [SearchValue, setSearchValue] = useState("");
    const [bank, setBank] = useState([]);
    const [showHide, setShowHide] = useState({});
    const screens = useBreakpoint();

    const onChange = (e) => {
        console.log(e.target.value);

        if (!!e.target.value) {
            setData(searchFinance(finance, e.target.value));
        }
        if (!e.target.value) {
            setData(finance);
        }
        setSearchValue(e.target.value);
    };
    const MoneyShowHide = (value) => {
        setShowHide({ ...showHide, [value]: !showHide[value] });
    };
    const NewBank = (bank, code) => {
        const newBank = getBankID(bank, code);
        return newBank;
    };

    useEffect(() => {
        getAllFinance().then((value) => {
            setFinance(value);
            setData(value);
        });

        getAllBank().then((value) => {
            setBank(value);
        });
    }, [finance != null]);

    return (
        <>
            <Card
                title={
                    <Col span={8}>
                        <Input
                            value={SearchValue}
                            onPaste={onChange}
                            style={{
                                width: "100%",
                            }}
                            onChange={onChange}
                            placeholder='Tìm kiếm: Số tài khoản | Code ngân hàng'
                        />
                    </Col>
                }
                extra={"Xem tất cả"}
            >
                <Carousel
                    swipeToSlide={true}
                    {...slidesToShow(screens)}
                    style={{ backgroundColor: "#f4f7fe" }}
                    infinite={true}
                    dots={false}
                    arrows
                >
                    {data.map((value) => (
                        <Col span={23} style={{ backgroundColor: "#f4f7fe" }}>
                            <Card
                                hoverable={true}
                                size='small'
                                extra={<MoreOutlined />}
                                title={
                                    <Image
                                        width={"100px"}
                                        preview={false}
                                        size={40}
                                        src={
                                            NewBank(bank, value.bank_Code)
                                                .bank_Logo
                                        }
                                    />
                                }
                                className={cx("card-style")}
                                variant={"outlined"}
                            >
                                <Row>
                                    <Col span={24}>
                                        {value.bank_AccountName.toUpperCase()}
                                    </Col>
                                    <Col
                                        span={24}
                                        style={{
                                            fontWeight: "lighter",
                                            color: "#0b5080",
                                        }}
                                    >
                                        {value.bank_AccountNumber}
                                    </Col>
                                    <Col
                                        span={24}
                                        style={{
                                            fontSize: "16px",
                                            color: "#0b5080",
                                        }}
                                    >
                                        <Flex
                                            justify='space-between'
                                            align='baseline'
                                        >
                                            <span
                                                style={{ alignSelf: "center" }}
                                            >
                                                {showHide[
                                                    value.bank_AccountNumber
                                                ] ? (
                                                    <>
                                                        {(100000000).toLocaleString(
                                                            "vi"
                                                        )}
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            {" VNĐ"}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        ••• ••• •••
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            {" VNĐ"}
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                            <span
                                                style={{ alignSelf: "center" }}
                                                onClick={() =>
                                                    MoneyShowHide(
                                                        value.bank_AccountNumber
                                                    )
                                                }
                                            >
                                                {showHide[
                                                    value.bank_AccountNumber
                                                ] ? (
                                                    <EyeInvisibleOutlined />
                                                ) : (
                                                    <EyeOutlined />
                                                )}
                                            </span>
                                        </Flex>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Carousel>
            </Card>
            <RevenueExpenditure />
        </>
    );
}

export default Finance;
