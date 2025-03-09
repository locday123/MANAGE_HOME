import Finance from "../Component/Finance/Finance"
import Dashboards from "../Component/Dashboards/Dashboards"
import Customer from "../Component/Customer/Customer"

const publicRoutes = [
    {path: "/finance", component: Finance},
    {path: "/dashboards", component: Dashboards},
    {path: "/customer", component: Customer},
    {path: "/", component: Dashboards},
]

export {publicRoutes}
