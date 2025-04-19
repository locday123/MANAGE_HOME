import { Statistic } from "antd";
interface CustomStatisticProps {
    title: string;
    value: number | string;
    style?: React.CSSProperties;
}

function CustomStatistic({ title, value }: CustomStatisticProps) {
    return (
        <Statistic
            title={title}
            value={value}
            style={{ textAlign: "center" }} // Căn giữa hoặc các style khác
        />
    );
}

export default CustomStatistic;
