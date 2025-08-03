import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Board from './Board.js';

const BoardMember = sequelize.define('BoardMember', {}, { timestamps: false });

User.belongsToMany(Board, { through: BoardMember, foreignKey: 'userId' });
Board.belongsToMany(User, { through: BoardMember, foreignKey: 'boardId' });

export default BoardMember;
