import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Team = sequelize.define('Team', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

export default Team;