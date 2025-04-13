import {Sequelize} from "sequelize"

const sequelize = new Sequelize("manage_home", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    logging: true, // tắt log SQL (có thể bật lên để debug)
    timezone: "+07:00", // múi giờ VN
})

export default sequelize
