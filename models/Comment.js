import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    commentedBy: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

export default Comment;