import express from "express"
import cors from "cors"
const app = express()
import customerRoutes from "./Routes/customerRoutes.js"
app.use(cors())
app.use(express.json())

// Sử dụng route customer
app.use("/api", customerRoutes)

// Lắng nghe
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server đang chạy trên cổng ${port}`)
})
