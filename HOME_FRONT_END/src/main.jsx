import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <ConfigProvider
        theme={{
            hashed: false,
            token: {
                fontFamily: "Inter Tight",
            },
        }}
    >
        <App />
    </ConfigProvider>
);
