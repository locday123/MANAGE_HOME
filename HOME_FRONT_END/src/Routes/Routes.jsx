import Finance from "../Component/Finance/Finance"
import Dashboards from "../Component/Dashboards/Dashboards"
import Customer from "../Component/Customer/Customer"
import Bank from "../Component/Bank/Bank"
import {Link} from "react-router-dom"
import Home from "../Component/Home/Home"

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
        label: <Link to={"/finance"}> Sổ quỹ</Link>,
        key: "/finance",
    },
    {
        path: "/home",
        component: Home,
        label: <Link to={"/home"}>Nhà</Link>,
        key: "/home",
    },
    {
        path: "/bank",
        component: Bank,
        label: <Link to={"/bank"}> Ngân hàng</Link>,
        key: "/bank",
    },
    {
        path: "/my-profile",
        component: Customer,
        label: <Link to={"/my-profile"}> Nhân sự</Link>,
        key: "/my-profile",
    },
]

export {publicRoutes}
