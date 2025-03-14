import Finance from "../Component/Finance/Finance";
import Dashboards from "../Component/Dashboards/Dashboards";
import Customer from "../Component/Customer/Customer";
import Bank from "../Component/Bank/Bank";
import { Link } from "react-router-dom";

const publicRoutes = [
    {
        path: "/" || "/dashboards",
        component: Dashboards,
        label: "Trang chủ",
        key: "/dashboards",
    },
    {
        path: "/finance",
        component: Finance,
        label: "Tài chính",
        key: "/finance",
    },
    {
        path: "/bank",
        component: Bank,
        label: <Link to={"/bank"}> Ngân hàng</Link>,
        key: "/bank",
    },
    {
        path: "/customer",
        component: Customer,
        label: <Link to={"/customer"}> Nhân sự</Link>,
        key: "/customer",
    },
];

export { publicRoutes };
