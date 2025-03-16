import { Card, Carousel, Col, Row, Grid } from "antd";
import { useEffect, useState } from "react";
import classnames from "classnames/bind";
import style from "../Finance/Finance.module.scss";

import { getAllBank, getBankID } from "../../Service/Bank/BankService";
import {
    getAllFinance,
    getFinanceID,
} from "../../Service/Finance/FinanceService";
import { slidesToShow } from "../../assets/ExtendedData";

const { useBreakpoint } = Grid;
const cx = classnames.bind(style);

function Finance() {
    const [finance, setFinance] = useState([]);
    const [bank, setBank] = useState([]);
    const screens = useBreakpoint();

    const NewBank = (bank, code) => {
        const newBank = getBankID(bank, code);
        return newBank;
    };

    useEffect(() => {
        getAllFinance().then((value) => {
            setFinance(value);
        });

        getAllBank().then((value) => {
            setBank(value);
        });
    }, [finance != null]);

    return (
        <Card className={cx("card-style")}>
            <Carousel arrows={true} {...slidesToShow(screens)} dots={false}>
                {finance.map((value) => (
                    <Col span={23}>
                        <Card
                            variant={"borderless"}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bolder",
                                backgroundImage:
                                    "linear-gradient(to top,rgb(197, 152, 180) 0%,rgb(126, 87, 177) 100%)",
                                height: "8rem",
                                color: "white",
                            }}
                        >
                            {NewBank(bank, value.bank_Code).bankName}
                        </Card>
                    </Col>
                ))}
            </Carousel>
        </Card>
    );
}

export default Finance;
