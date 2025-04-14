import express from "express"
import cors from "cors"
const app = express()
import customerRoutes from "./Routes/customerRoutes.js"
import homeRoutes from "./Routes/homeRoutes.js"
import floorRoutes from "./Routes/floorRoutes.js"
app.use(cors())
app.use(express.json())

// Sử dụng route customer
app.use("/api", customerRoutes)
app.use("/api", homeRoutes)
app.use("/api", floorRoutes)

// Lắng nghe
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server đang chạy trên cổng ${port}`)
})
