import {
    Card,
    Carousel,
    Col,
    Row,
    Grid,
    Image,
    Flex,
    Form,
    Button,
    Input,
    Table,
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
import { getAllFinance } from "../../Service/Finance/FinanceService";
import { slidesToShow } from "../../assets/ExtendedData";

const { useBreakpoint } = Grid;
const cx = classnames.bind(style);

function Finance() {
    const [finance, setFinance] = useState([]);
    const [bank, setBank] = useState([]);
    const [showHide, setShowHide] = useState({});
    const screens = useBreakpoint();
    const MoneyShowHide = (value) => {
        setShowHide({ ...showHide, [value]: !showHide[value] });
    };
    const NewBank = (bank, code) => {
        const newBank = getBankID(bank, code);
        return newBank;
    };

    const FormSearch = () => {
        return (
            <Row gutter={8}>
                <Col span={8}>
                    <Input
                        width={"100%"}
                        placeholder='Tìm kiếm: Code | Tên ngắn | Tên ngân hàng'
                    />
                </Col>
            </Row>
        );
    };
    const columns = [
        {
            key: "revenueExpenditure_ID",
            title: "Mã thu chi",
            dataIndex: "revenueExpenditure_ID",
            align: "center",
            width: "10rem",
        },
        {
            key: "revenueExpenditure_Form",
            title: "Hình thức",
            dataIndex: "revenueExpenditure_Form",
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
            key: "revenueExpenditureType_ID",
            title: "Loại",
            dataIndex: "revenueExpenditureType_ID",
            align: "center",
            width: "10rem",
        },
        {
            key: "revenueExpenditure_Content",
            title: "Nội dung",
            dataIndex: "revenueExpenditureType_ID",
            width: "20rem",
        },
        {
            key: "payment_ScheduleID",
            title: "Hợp đồng",
            dataIndex: "payment_ScheduleID",
            align: "center",
            width: "10rem",
        },
        {
            key: "bank_AccountID",
            title: "Tài khoản",
            dataIndex: "bank_AccountID",
            align: "center",
            width: "10rem",
        },
        {
            key: "amountReceived_Amount",
            title: "Số tiền",
            dataIndex: "amountReceived_Amount",
            align: "center",
            width: "10rem",
        },
        {
            key: "date_Add",
            title: "Ngày",
            dataIndex: "date_Add",
            align: "center",
            width: "10rem",
        },
    ];
    useEffect(() => {
        getAllFinance().then((value) => {
            setFinance(value);
        });

        getAllBank().then((value) => {
            setBank(value);
        });
    }, [finance != null]);

    return (
        <>
            <Card title={<FormSearch />} extra={"Xem tất cả"}>
                <Carousel
                    swipeToSlide={true}
                    {...slidesToShow(screens)}
                    style={{ backgroundColor: "#f4f7fe" }}
                    infinite={true}
                    dots={false}
                    arrows
                >
                    {finance.map((value) => (
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
            <Card title={<FormSearch />}>
                <Table
                    bordered={true}
                    scroll={{
                        x: "max-content",
                        y: "max-content",
                    }}
                    dataSource={bank}
                    pagination={{ position: ["topRight"] }}
                    columns={columns}
                />
            </Card>
        </>
    );
}

export default Finance;
