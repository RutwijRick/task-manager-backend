import Board from "./Board.js";
import BoardMember from "./BoardMember.js";
import Task from "./Task.js";
import Team from "./Team.js";
import User from "./User.js";


// Board and BoardMember
Board.hasMany(BoardMember, { foreignKey: 'boardId', as: 'memberships' });
BoardMember.belongsTo(Board, { foreignKey: 'boardId' });

// User and BoardMember
User.hasMany(BoardMember, { foreignKey: 'userId', as: 'boardMemberships' });
BoardMember.belongsTo(User, { foreignKey: 'userId' });

// Team can have many tasks
Team.hasMany(Task, { foreignKey: 'teamId' });
Task.belongsTo(Team, { foreignKey: 'teamId' });

export { User, Board, BoardMember };
