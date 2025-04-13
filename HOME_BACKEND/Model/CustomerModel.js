import {DataTypes} from "sequelize"
import sequelize from "../Connect/Connect.js"

const Customer = sequelize.define(
    "Customer",
    {
        customer_ID: {
            type: DataTypes.STRING(12),
            primaryKey: true,
            allowNull: false,
        },
        customer_Name: {
            type: DataTypes.STRING(255),
        },
        customer_Sex: {
            type: DataTypes.BOOLEAN,
        },
        customer_PhoneNumber: {
            type: DataTypes.STRING(10),
            validate: {
                is: /^[0-9]{10}$/,
            },
        },
        customer_Province: {
            type: DataTypes.STRING(10),
        },

        customer_District: {
            type: DataTypes.STRING(10),
        },
        customer_Ward: {
            type: DataTypes.STRING(10),
        },
        customer_Address: {
            type: DataTypes.STRING(50),
        },
        customer_Date: {
            type: DataTypes.DATEONLY,
        },
        customer_Front: {
            type: DataTypes.STRING(255),
        },
        customer_Back: {
            type: DataTypes.STRING(255),
        },
        customer_Status: {
            type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "CUSTOMER",
        timestamps: false,
        indexes: [
            {name: "idx_customer_PhoneNumber", fields: ["customer_PhoneNumber"]},
            {name: "idx_customer_Address", fields: ["customer_Address"]},
        ],
    }
)

export default Customer
