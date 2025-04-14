import {DataTypes} from "sequelize"
import sequelize from "../Connect/Connect.js"
import {nanoid} from "nanoid"
import Home from "../Model/HomeModel.js" // đảm bảo bạn import đúng model HOME

const Floor = sequelize.define(
    "Floor",
    {
        floor_ID: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            defaultValue: () => `FLOOR_${nanoid(6).toUpperCase()}`,
        },
        home_ID: {
            type: DataTypes.STRING(20),
            allowNull: false,
            references: {
                model: Home,
                key: "home_ID",
            },
            onDelete: "CASCADE",
        },
        floor_Name: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        floor_TotalRooms: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "FLOOR",
        timestamps: false,
    }
)

// Thiết lập quan hệ giữa Floor và Home
Home.hasMany(Floor, {
    foreignKey: "home_ID",
    sourceKey: "home_ID",
    onDelete: "CASCADE",
})

Floor.belongsTo(Home, {
    foreignKey: "home_ID",
    targetKey: "home_ID",
    onDelete: "CASCADE",
})

export default Floor
