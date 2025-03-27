import React, {createContext, useContext} from "react"
import {notification, App} from "antd"

const NotificationContext = createContext(null)

export const NotificationProvider = ({children}) => {
    const [api, contextHolder] = notification.useNotification()

    return (
        <NotificationContext.Provider value={api}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}
