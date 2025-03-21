import Finance from "../Component/Finance/Finance"
import Dashboards from "../Component/Dashboards/Dashboards"
import MyCustomer from "../Component/MyCustomer/MyCustomer"
import Customer from "../Component/Customer/Customer"
import Bank from "../Component/Bank/Bank"
import {Link} from "react-router-dom"
import Home from "../Component/Home/Home"
import {MailOutlined} from "@ant-design/icons"
const publicRoutes = [
    {
        path: ["/", "/dashboards"],
        component: Dashboards,
        label: <Link to={"/"}>Trang chủ</Link>,
        isMenu: true,
        icon: <MailOutlined />,
        key: "/dashboards",
    },

    {
        path: "/finance",
        component: Finance,
        label: <Link to={"/finance"}> Sổ quỹ</Link>,
        isMenu: true,
        icon: <MailOutlined />,
        key: "/finance",
    },
    {
        path: "/customer",
        component: Customer,
        label: <Link to={"/customer"}> Khách hàng</Link>,
        isMenu: true,
        icon: <MailOutlined />,
        key: "/customer",
    },
    {
        path: "/home",
        component: Home,
        label: <Link to={"/home"}>Nhà</Link>,
        isMenu: true,
        icon: <MailOutlined />,
        key: "/home",
    },
    {
        path: "/home/:name",
        component: Home,
        isMenu: false,

        key: "/home/:name",
    },

    {
        path: "/bank",
        component: Bank,
        label: <Link to={"/bank"}> Ngân hàng</Link>,
        isMenu: true,
        icon: <MailOutlined />,
        key: "/bank",
    },
    {
        path: "/my-profile",
        component: MyCustomer,
        label: <Link to={"/my-profile"}> Nhân sự</Link>,
        isMenu: false,
        key: "/my-profile",
    },
]

export {publicRoutes}
