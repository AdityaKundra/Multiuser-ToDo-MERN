# Multiuser Todo

A todo app with its own accounts. Each person registers, signs in, and only works with their own tasks.

The React frontend talks to an Express API. Passwords are hashed with bcrypt. Sign-in returns a JWT, and todo routes require that token. Tasks have a title, description, pending or completed status, and an optional due date. A task can also have subtasks.

## Run it

MongoDB should be running locally. The API connects to `mongodb://localhost:27017/beProjectTodo`.

Backend, on port 5001. Create `backend/.env` with a JWT secret:

```bash
JWT_TOKEN=replace-with-a-long-random-string
```

```bash
cd backend
npm install
npm install mongoose
npm run dev
```

`backend/package.json` lists `moongose` instead of `mongoose`. The second install is what the API actually imports.

Frontend, on port 3000:

```bash
cd frontend
npm install
npm start
```

Register an account, then sign in with that email and password.

## API

Auth, open:

| Method | Path | Body |
| --- | --- | --- |
| `POST` | `/api/auth/register` | `{ "email", "password" }` |
| `POST` | `/api/auth/login` | `{ "email", "password" }` |

Todos, send `Authorization: Bearer <token>`:

| Method | Path | What it does |
| --- | --- | --- |
| `GET` | `/api/todo` | List the signed-in user's tasks |
| `POST` | `/api/todo/add` | Create a task. Body: `title`, `description`, `status`, `dueDate` |
| `POST` | `/api/todo/update` | Edit a task. Body includes `id` |
| `POST` | `/api/todo/status` | Body: `taskId`, `status` (`pending` or `completed`) |
| `POST` | `/api/todo/subTask` | Add a subtask |
| `GET` | `/api/todo/subTask/:parentId` | List subtasks |
| `POST` | `/api/todo/removeTask` | Remove a subtask |
