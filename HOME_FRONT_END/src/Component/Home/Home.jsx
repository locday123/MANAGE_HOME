import { Card, Collapse, Table } from "antd";
import { useEffect, useState } from "react";

import { getAllHome } from "../../Service/Home//HomeSerivce";
import { columnsTable, FormFilter } from "./HomeExtend";
import {
    getAllFloor,
    searchHomeInFloor,
} from "../../Service/FLOOR/FloorService";

function Home() {
    const [home, setHome] = useState([]);
    const [floor, setFloor] = useState([]);

    useEffect(() => {
        getAllHome().then((value) => {
            setHome(value);
        });
        getAllFloor().then((value) => {
            setFloor(value);
        });
    }, [home != null && floor != null]);
    return (
        <Card title={<FormFilter />}>
            <Table
                columns={columnsTable}
                pagination={false}
                scroll={{
                    x: "max-content",
                    y: 80 * 5,
                }}
                dataSource={home}
                rowKey='home_ID'
            />
        </Card>
    );
}
export default Home;
