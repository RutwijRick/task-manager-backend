This is a scalable backend for a Trello-like task manager.

## Features
- User Authentication with JWT.
- Boards, Tasks CRUD.
- Comments, Teams.
- Real-time updates via WebSocket (Socket.IO).
- Swagger API Docs (OpenAPI 3).
- Top 3 active users analytics.
- Role-based board access.
- Sequelize with MySQL.

## Tech Stack
- Node.js + Express
- Sequelize ORM + MySQL
- JWT Auth
- Swagger UI
- Socket.IO

## Setup
```bash
git clone https://github.com/RutwijRick/task-manager-backend.git task-manager-backend
cd task-manager-backend
npm install
npm run dev
```

## Environment Variables
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=adataskmanager
JWT_SECRET=your_jwt_secret
```

## Swagger Docs
Run: http://localhost:5000/api-docs

## Auth
Use the login route to get JWT, then pass it in Swagger `Authorize` (top right)

## WebSocket
Client should connect using userId:
```js
io('http://localhost:5000', { query: { userId } })
```
Simple GUI: Open socket-test.html file.

## Default User (Seeded)
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
*/

## How can we scale this for 10M+ users
  - Architecture
    - Move to microservices: auth, boards, tasks, comments, notifications.
    - Use Redis Pub/Sub for WebSocket scalability.
    - Load balancer + Node.js clusters + PM2 for horizontal scaling.

  - Database
    - Read/Write DB separation.
    - Use MySQL read replicas and sharding by boardId for scale.

  - Caching
    - Redis to cache frequent reads (e.g., board metadata, user sessions).
    - Use CDN for static files and API Gateway rate limiting.

  - Queueing
    - Background jobs via Bull (Redis) for sending emails, analytics.

  - Monitoring
    - Prometheus + Grafana + Elastic Stack.
    - Alerts on error rates, DB bottlenecks, or socket disconnections.


## Assumptions and other details
- I have assumed here, each Board will have Board Members. Only these members can modify Tasks and Board details (checked via middleware).
- Each Task will be assigned to teams.
- Go to http://localhost:5000/api-docs to check all REST APIs.
- WebSocket working can be checked via socket-test.html file.
- Tried to Dockerize but Docker was not working on my PC as my CPU does not allow virtualization. I still added Docker files, not able to test them though. 

## A general flow that I had followed.
  - Open http://localhost:5000/api-docs then register and login via these credentials.
  - Copy the token and click Authorize button (top-right), paste the token to stay logged in.
  - Only Logged In Users are allowed to perform the operations listed below.
  - Board
    - Create board (automatically adds as a board member).
    - Get all boards: List all created boards by all users.
    - Update Board: update board details (only board members can modify).
    - Delete Board: delete board details (only board members can delete).
  - BoardMember
    - Add Members to board
  - Task
    - Create task: create a task and also assign to a team at the same time.
    - Get task with filters: get a task by status and teamId with pagination.
    - Get paginated tasks by board ID: get tasks by boardIdwith pagination.
    - Update task (only board members can modify).
    - Delete task (only board members can delete).
    - Assign task (only board members can modify).
    - Change task status (only board members can modify).
  - Team
    - Create a team
    - Fetch all teams.
  - Comments
    - Add Comments on tasks.
    - Get Comments: by taskId.

## Table Schemas and Relations can be read in ERD.txt file