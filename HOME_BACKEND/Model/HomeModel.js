import {DataTypes} from "sequelize"
import sequelize from "../Connect/Connect.js"
import {nanoid} from "nanoid"

const Home = sequelize.define(
    "Home",
    {
        home_ID: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            defaultValue: () => `HOME_${nanoid(6).toUpperCase()}`,
        },
        home_Province: {
            type: DataTypes.STRING(10),
        },
        home_District: {
            type: DataTypes.STRING(10),
        },
        home_Ward: {
            type: DataTypes.STRING(10),
        },
        home_Address: {
            type: DataTypes.STRING(50),
        },
        home_RentalPrice: {
            type: DataTypes.BIGINT,
        },
        home_HostID: {
            type: DataTypes.STRING(12),
        },
        home_HostName: {
            type: DataTypes.STRING(255),
        },
        home_HostPhoneNumber: {
            type: DataTypes.STRING(10),
            validate: {
                is: /^[0-9]{10}$/,
            },
        },
        home_ContractFrom: {
            type: DataTypes.DATEONLY,
        },
        home_ContractTo: {
            type: DataTypes.DATEONLY,
        },
        home_HostSignature: {
            type: DataTypes.TEXT,
        },
        home_TotalFloors: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },
        home_Status: {
            type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "HOME",
        timestamps: false,
        indexes: [{name: "idx_home_Address", fields: ["home_Address"]}],
    }
)

export default Home
