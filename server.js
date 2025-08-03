import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import sequelize from './config/db.js';
import swaggerSpec from './config/swagger.js';
import authRoutes from './routes/auth.routes.js';
import seedDatabase from './seeders/sampleData.js';
import boardRoutes from './routes/board.routes.js';
import boardMemberRoutes from './routes/boardmember.routes.js';
import taskRoutes from './routes/task.routes.js';
import teamRoutes from './routes/team.routes.js';
import commentRoutes from './routes/comment.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import registerSocketEvents from './sockets/events.js';
import './models/index.js'; 

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

global.io = io;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/board-members', boardMemberRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/analytics', analyticsRoutes);

registerSocketEvents(io);
app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;

const init = async () => {
  try {
    // await createDatabaseIfNotExists();
    await sequelize.sync(); 
    await seedDatabase();
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Startup Error:', err);
  }
};

init();