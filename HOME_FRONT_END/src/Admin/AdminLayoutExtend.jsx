import {Link} from "react-router-dom"
import {UserOutlined, LogoutOutlined} from "@ant-design/icons"
const AdminLayout_Data = {
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

    DropdownMenu: {
        items: [
            {
                label: <Link to={"/my-profile"}> Tài khoản của tôi</Link>,
                key: "0",
                icon: <UserOutlined />,
            },
            {label: "Đăng xuất", key: "21", icon: <LogoutOutlined />},
        ],
    },
}

export {AdminLayout_Data}
