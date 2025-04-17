import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import {publicRoutes} from "./router/router"

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    if (!route.component || !route.path) return null // ❗ bỏ qua nếu không có component hoặc path

                    const Component = route.component
                    return (
                        <Route
                            key={index}
                            path={Array.isArray(route.path) ? route.path[0] : route.path}
                            element={
                                <AdminLayout>
                                    <Component />
                                </AdminLayout>
                            }
                        />
                    )
                })}
            </Routes>
        </Router>
    )
}

export default App
