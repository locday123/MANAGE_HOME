import Finance from "../Component/Finance/Finance"
import Dashboards from "../Component/Dashboards/Dashboards"
import Customer from "../Component/Customer/Customer"

const publicRoutes = [
    {path: "/" || "/dashboards", component: Dashboards, label: "Trang chủ", key: "/dashboards"},
    {path: "/finance", component: Finance, label: "Tài chính", key: "/finance"},

    {path: "/customer", component: Customer, label: "Nhân sự", key: "/customer"},
]

export {publicRoutes}
