import Finance from "../Component/Finance/Finance"
import Dashboards from "../Component/Dashboards/Dashboards"

const publicRoutes = [
    {path: "/finance", component: Finance},
    {path: "/dashboards", component: Dashboards},
    {path: "/", component: Dashboards},
]

export {publicRoutes}
