import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {publicRoutes} from "./Routes/Routes"
import AdminLayout from "./Admin/AdminLayout"

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Comopent = route.component
                    return (
                        <Route
                            key={index}
                            path={Array.isArray(route.path) ? route.path[0] : route.path}
                            element={<AdminLayout>{<Comopent />}</AdminLayout>}
                        />
                    )
                })}
            </Routes>
        </Router>
    )
}

export default App
