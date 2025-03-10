import {UserOutlined, LogoutOutlined, InfoCircleFilled, LockFilled} from "@ant-design/icons"
import CustomerInfo from "../Component/Customer/CustomerInfo/CustomerInfo"

const ExtendedData = {
    AdminLayout: {
        cssNameInfo: {
            cssHidden: {
                opacity: 0,
                visibility: "hidden",
                width: "0px",
                paddingLeft: "0px",
                paddingRight: "0px",
                marginLeft: "0px",
            },
            cssShow: {
                width: "calc(100% - 62px)",
                marginLeft: "16px",
                transition: "0.2s",
            },
        },

        items: [
            {label: "Tài khoản của tôi", key: "0", icon: <UserOutlined />},
            {label: "Đổi mật khẩu", key: "1", icon: <LockFilled />},
            {label: "Đăng xuất", key: "2", icon: <LogoutOutlined />},
        ],
    },

    Customer: {
        TabsItem: [
            {
                label: "Thông tin cá nhân",
                children: <CustomerInfo />,
                key: "1",
                icon: <UserOutlined />,
            },
            {
                label: "Thay đổi mật khẩu",
                children: "Thay đổi mật khẩu",
                key: "2",
                icon: <LockFilled />,
            },
            {
                label: "Thông tin khác",
                children: "Thông tin khác",
                key: "3",
                icon: <InfoCircleFilled />,
            },
        ],
    },

    CustomerInfo: {},
}

export {ExtendedData}
