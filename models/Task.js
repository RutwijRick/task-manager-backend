import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: 'todo' },
    teamId: { type: DataTypes.INTEGER },
    boardId: { type: DataTypes.INTEGER, allowNull: false },
    createdBy: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

export default Task;