import {createRoot} from "react-dom/client"
import {ConfigProvider} from "antd"

import "dayjs/locale/vi"
import locale from "antd/es/locale/vi_VN"
import App from "./App.jsx"

createRoot(document.getElementById("root")!).render(
    <ConfigProvider
        locale={locale}
        theme={{
            hashed: false,
            token: {},
        }}
    >
        <App />
    </ConfigProvider>
)
