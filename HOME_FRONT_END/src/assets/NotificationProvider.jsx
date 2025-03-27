import React, { createContext, useContext, useEffect } from "react";
import { notification, App } from "antd";

const NotificationContext = createContext(null);
let globalOpenNotification = null;

export const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, message, description) => {
        api[type]({
            message,
            description,
            placement: "bottomRight",
        });
    };
    useEffect(() => {
        globalOpenNotification = openNotification;
    }, []);
    return (
        <NotificationContext.Provider value={{ openNotification }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};
export const notify = (type, message, description) => {
    if (globalOpenNotification) {
        globalOpenNotification(type, message, description);
    } else {
        console.error("Notification chưa được khởi tạo");
    }
};
