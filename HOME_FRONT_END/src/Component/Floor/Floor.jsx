import { Button, Card, Table, Tabs } from "antd";
import style from "../Floor/Floor.module.scss";
import classname from "classnames/bind";
import { getAllHome } from "../../Service/Home/HomeSerivce";
import { useEffect, useState } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import CustomCard from "../Extend/Card/CustomCard";

import { FormFilter, columnsTable } from "../Floor/FloorExtend";
const cx = classname.bind(style);
function Floor() {
    const [home, setHome] = useState([]);
    const [floors, setFloors] = useState([]);
    const [valueCreate, setValueCreate] = useState([]);
    useEffect(() => {
        getAllHome().then((data) => {
            setHome(data);
        });
    }, []);
    const sortedFloors = [...floors].sort((a, b) => {
        const getFloorIndex = (floorName) => {
            if (!floorName) return Infinity;
            if (floorName.toLowerCase().includes("Trệt")) return 0;

            const match = floorName.match(/\d+/);
            return match ? parseInt(match[0], 10) : Infinity;
        };

        return getFloorIndex(a.floor_Name) - getFloorIndex(b.floor_Name);
    });
    return (
        <CustomCard
            title={
                <FormFilter
                    data={home}
                    valueCreate={valueCreate}
                    setValueCreate={setValueCreate}
                    setFloors={setFloors}
                />
            }
            extra={
                <Button
                    icon={<AppstoreAddOutlined style={{ fontSize: "22px" }} />}
                    type='primary'
                />
            }
        >
            <Table
                showHeader={false}
                dataSource={floors}
                columns={columnsTable}
                pagination={false}
            />
        </CustomCard>
    );
}

export default Floor;
