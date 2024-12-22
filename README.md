# Nooro Backend API

A robust Node.js backend service for the Nooro Task Management application, built with Express and PostgreSQL.

## 🚀 Features

- 🔐 Device-based authentication
- 🗄️ PostgreSQL with Prisma ORM
- 🌐 RESTful API architecture
- 📝 Comprehensive logging system
- ⚡ Efficient error handling
- 🔄 Real-time task management
- 📊 Data validation with Zod
- 🛠️ TypeScript for type safety

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Logging:** Winston
- **Type Safety:** TypeScript
- **Development:** 
  - ESLint
  - Prettier
  - Nodemon
  - ts-node

## 📦 Project Structure

```
nooro-backend/
├── src/
│   ├── config/           # Configuration files
│   ├── lib/             # Shared utilities
│   │   ├── db.ts        # Database connection
│   │   ├── errors.ts    # Error handling
│   │   └── logger.ts    # Logging setup
│   ├── modules/         # Feature modules
│   │   └── task/        # Task module
│   │       ├── task.controller.ts
│   │       ├── task.model.ts
│   │       ├── task.routes.ts
│   │       ├── task.service.ts
│   │       ├── task.types.ts
│   │       └── task.validation.ts
│   ├── middleware/      # Express middleware
│   └── types/          # TypeScript types
├── prisma/             # Prisma schema and migrations
└── logs/              # Application logs
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- PostgreSQL 14 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AkhtarZaman7/backend.git
cd nooro-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
LOG_LEVEL=info

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nooro_db"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=nooro_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build artifacts
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data

## 🔌 API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

### Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-Device-ID` | Yes | Unique device identifier |
| `Content-Type` | Yes | Must be `application/json` |

## 📝 API Documentation

### Get All Tasks

```http
GET /tasks
X-Device-ID: {device_id}
```

Response:
```json
[
  {
    "id": "uuid",
    "title": "Task title",
    "completed": false,
    "color": "#FF5733",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create Task

```http
POST /tasks
X-Device-ID: {device_id}
Content-Type: application/json

{
  "title": "New task",
  "color": "#FF5733"
}
```

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | `development` |
| `PORT` | Server port | No | `5000` |
| `LOG_LEVEL` | Winston log level | No | `info` |
| `DATABASE_URL` | PostgreSQL connection URL | Yes | - |
| `POSTGRES_USER` | Database user | Yes | - |
| `POSTGRES_PASSWORD` | Database password | Yes | - |
| `POSTGRES_DB` | Database name | Yes | - |
| `POSTGRES_HOST` | Database host | Yes | - |
| `POSTGRES_PORT` | Database port | Yes | `5432` |

## 📊 Database Schema

```prisma
model Task {
  id        String   @id @default(uuid())
  title     String
  completed Boolean  @default(false)
  color     String
  deviceId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([deviceId])
}
```

## 🧪 Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Optional validation errors
}
```

## 📝 Logging

Logs are stored in the `logs` directory:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs



## 👥 Authors

- Your Name - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) for the web framework
- [Prisma](https://www.prisma.io/) for the database ORM
- [Winston](https://github.com/winstonjs/winston) for logging
