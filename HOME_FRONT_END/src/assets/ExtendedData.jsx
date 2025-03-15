import {UserOutlined, LogoutOutlined, ReconciliationOutlined, LockFilled} from "@ant-design/icons"
import CustomerInfo from "../Component/Customer/CustomerInfo/CustomerInfo"
import ChangPassword from "../Component/Customer/ChangPassword/ChangPassword"
import MyContract from "../Component/Customer/MyContract/MyContract"
import {Link} from "react-router-dom"

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

const Customer_Data = [
    {
        label: "Thông tin cá nhân",
        children: <CustomerInfo />,
        key: "1",
        icon: <UserOutlined />,
    },
    {
        label: "Thay đổi mật khẩu",
        children: <ChangPassword />,
        key: "2",
        icon: <LockFilled />,
    },
    {
        label: "Hợp đồng thuê",
        children: <MyContract />,
        key: "3",
        icon: <ReconciliationOutlined />,
    },
]

const CustomerInfo_Data = [
    {
        nameInput: "fullname",
        required: true,
        message: "Vui lòng nhập họ và tên!",
        placehoder: "Họ và tên",
    },
    {
        nameInput: "phone-number",
        required: true,
        message: "Vui lòng nhập họ và tên!",
        placehoder: "Số điện thoại",
    },
    {
        nameInput: "email",
        required: true,
        message: "Vui lòng nhập Email",
        placehoder: "Email",
    },
    {
        nameInput: "adress",
        required: true,
        message: "Vui lòng nhập địa chỉ",
        placehoder: "Địa chỉ",
    },
]

export {AdminLayout_Data, CustomerInfo_Data, Customer_Data}
