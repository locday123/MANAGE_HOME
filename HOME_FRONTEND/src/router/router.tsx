import {ReactNode} from "react"
import {
    UserOutlined,
    FileTextOutlined,
    TeamOutlined,
    HistoryOutlined,
    StarOutlined,
    HomeOutlined,
    AppstoreOutlined,
    BuildOutlined,
    ApartmentOutlined,
    SettingOutlined,
    ContainerOutlined,
    ToolOutlined,
    CreditCardOutlined,
    ShopOutlined,
    WalletOutlined,
} from "@ant-design/icons"
import Dashboard from "../pages/Dashboard/dashboard.page"
import Customer from "../pages/Customer/customers.page"
import Home from "../pages/Home/home.page"
import Floor from "../pages/Floor/floor.page"

type RouteItem = {
    key: string
    path?: string
    label: string
    parent?: string
    component?: React.FC
    icon?: ReactNode
}

const publicRoutes: RouteItem[] = [
    {
        key: "customer-management",
        label: "Khách hàng & hợp đồng",
        icon: <UserOutlined />,
    },
    {
        key: "/customers",
        path: "/customers",
        label: "Khách hàng",
        parent: "customer-management",
        component: Customer,
        icon: <UserOutlined />,
    },
    {
        key: "/contracts",
        path: "/contracts",
        label: "Hợp đồng thuê",
        parent: "customer-management",
        component: Dashboard,
        icon: <FileTextOutlined />,
    },
    {
        key: "/room-mates",
        path: "/room-mates",
        label: "Bạn cùng phòng",
        parent: "customer-management",
        component: Dashboard,
        icon: <TeamOutlined />,
    },
    {
        key: "/customer-history",
        path: "/customer-history",
        label: "Lịch sử khách hàng",
        parent: "customer-management",
        component: Dashboard,
        icon: <HistoryOutlined />,
    },
    {
        key: "/customer-rating",
        path: "/customer-rating",
        label: "Xếp hạng & đánh giá",
        parent: "customer-management",
        component: Dashboard,
        icon: <StarOutlined />,
    },
    {
        key: "building-management",
        label: "Tòa nhà & phòng",
        icon: <HomeOutlined />,
    },
    {
        key: "/homes",
        path: "/homes",
        label: "Danh sách nhà",
        parent: "building-management",
        component: Home,
        icon: <ShopOutlined />,
    },
    {
        key: "/floors",
        path: "/floors",
        label: "Tầng",
        parent: "building-management",
        component: Floor,
        icon: <ApartmentOutlined />,
    },
    {
        key: "/rooms",
        path: "/rooms",
        label: "Phòng",
        parent: "building-management",
        component: Dashboard,
        icon: <AppstoreOutlined />,
    },
    {
        key: "/room-layout",
        path: "/room-layout",
        label: "Bố trí phòng",
        parent: "building-management",
        component: Dashboard,
        icon: <BuildOutlined />,
    },
    {
        key: "/room-history",
        path: "/room-history",
        label: "Lịch sử sử dụng",
        parent: "building-management",
        component: Dashboard,
        icon: <HistoryOutlined />,
    },
    {
        key: "/smart-home",
        path: "/smart-home",
        label: "Smart Home",
        parent: "building-management",
        component: Dashboard,
        icon: <SettingOutlined />,
    },
    {
        key: "asset-management",
        label: "Tài sản & nội thất",
        icon: <ContainerOutlined />,
    },
    {
        key: "/products",
        path: "/products",
        label: "Danh mục sản phẩm",
        parent: "asset-management",
        component: Dashboard,
        icon: <ContainerOutlined />,
    },
    {
        key: "/assets",
        path: "/assets",
        label: "Tài sản phòng",
        parent: "asset-management",
        component: Dashboard,
        icon: <AppstoreOutlined />,
    },
    {
        key: "/asset-maintenance",
        path: "/asset-maintenance",
        label: "Lịch sử bảo trì",
        parent: "asset-management",
        component: Dashboard,
        icon: <ToolOutlined />,
    },
    {
        key: "payment-management",
        label: "Thanh toán & công nợ",
        icon: <WalletOutlined />,
    },
    {
        key: "/payment-schedule",
        path: "/payment-schedule",
        label: "Lịch thanh toán",
        parent: "payment-management",
        component: Dashboard,
        icon: <CreditCardOutlined />,
    },
    {
        key: "/debt-management",
        path: "/debt-management",
        label: "Công nợ khách hàng",
        parent: "payment-management",
        component: Dashboard,
    },
]

export {publicRoutes}
