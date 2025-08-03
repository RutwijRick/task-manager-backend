import BoardMember from '../models/BoardMember.js';

export default function registerSocketEvents(io) {
    io.on('connection', async (socket) => {
        const userId = socket.handshake.query.userId;
        if (!userId) return;
        const memberships = await BoardMember.findAll({ where: { userId } });
        memberships.forEach(({ boardId }) => socket.join(`board-${boardId}`));
        socket.on('disconnect', () => console.log('User disconnected:', socket.id));
    });
}