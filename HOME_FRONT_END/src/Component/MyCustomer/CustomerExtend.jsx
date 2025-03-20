import CustomerInfo from "./CustomerInfo/CustomerInfo";
import ChangPassword from "./ChangPassword/ChangPassword";
import MyContract from "./MyContract/MyContract";
import {
    UserOutlined,
    LockFilled,
    ReconciliationOutlined,
} from "@ant-design/icons";
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
];

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
];

export { CustomerInfo_Data, Customer_Data };
