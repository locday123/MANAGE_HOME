import { DataTypes } from "sequelize";
import sequelize from "../Connect/Connect.js";
import { nanoid } from "nanoid";
import Floor from "./FloorModel.js"; // đảm bảo đúng path import Floor

const Room = sequelize.define(
    "Room",
    {
        room_ID: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            defaultValue: () => `ROOM_${nanoid(6).toUpperCase()}`,
        },
        floor_ID: {
            type: DataTypes.STRING(20),
            allowNull: false,
            references: {
                model: Floor,
                key: "floor_ID",
            },
            onDelete: "CASCADE",
        },
        room_Name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        room_Area: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        room_Status: {
            type: DataTypes.ENUM(
                "AVAILABLE",
                "OCCUPIED",
                "MAINTENANCE",
                "INACTIVE",
                "ACTIVE"
            ),
            defaultValue: "AVAILABLE",
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "ROOM",
        timestamps: false,
    }
);

export default Room;
