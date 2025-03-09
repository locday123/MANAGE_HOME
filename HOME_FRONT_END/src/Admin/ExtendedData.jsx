import { UserOutlined, LogoutOutlined, LockFilled } from "@ant-design/icons";

const ExtendedData = {
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
        { label: "Tài khoản của tôi", key: "0", icon: <UserOutlined /> },
        { label: "Đổi mật khẩu", key: "1", icon: <LockFilled /> },
        { label: "Đăng xuất", key: "2", icon: <LogoutOutlined /> },
    ],
};

export { ExtendedData };
