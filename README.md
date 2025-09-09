# 🕒 Reminder System – Full Stack MERN Application

Welcome to the **Reminder System**, a robust and scalable full-stack application built with the MERN (MongoDB, Express.js, React, Node.js) stack and Prisma ORM. This project provides a comprehensive solution for managing reminder rules linked to tasks, featuring audit logging, a polished UI, and a modular architecture. Designed for audit-readiness and ease of maintenance, it is ideal for personal or enterprise use.

- **Created/Updated**: September 09, 2025
- **Author**: Muhammed Hashim

---

## 🚀 Tech Stack

### Backend

- **Node.js** with **Express.js** for the server framework
- **TypeScript** for type safety and scalability
- **Prisma ORM** with **PostgreSQL** for database management
- RESTful API architecture for seamless communication

### Frontend

- **React** with **Vite** for a fast and efficient UI
- **Tailwind CSS** for responsive and customizable styling
- **ShadCN UI** components for a modern interface

---

## 📦 Features

- **Reminder Rule Management**: Create, update, delete, and toggle reminder rules
- **Activation Control**: Enable or disable reminders with a toggle switch
- **Audit Logging**: Track all rule changes (create, update, delete, toggle) with timestamps and task context
- **Task Integration**: Associate reminders with tasks including due dates
- **User Experience**: Responsive UI with skeleton loading, empty states, and toast notifications via Sonner
- **Confirmation Prompts**: Ensure safe deletions with confirmation dialogs
- **Modular Design**: Clean separation of concerns for maintainability

---

## 🧠 Project Structure

```
reminder-system/
├── backend/
│   ├── src/
│   │   ├── controllers/        # API route handlers
│   │   ├── repositories/       # Data access layer
│   │   ├── services/           # Business logic
│   │   ├── schemas/            # Validation schemas (e.g., Zod)
│   │   ├── models/             # Prisma models
│   │   └── routes/             # API endpoints
├── frontend/
│   ├── src/
│   │   ├── modules/              # Page-level components
│   │   ├── components/         # Reusable UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service layer
│   │   └── types/              # TypeScript type definitions
├── .env.example            # Environment variables
└── README.md                   # This file
```

---

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** (v18.x or later)
- **npm** or **yarn**
- **PostgreSQL** (v15.x or later)

### 1. Clone the Repository

```bash
git clone https://github.com/hashim6789/reminder-system.git
cd reminder-system
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
```

- Update `.env` with your PostgreSQL credentials and other configurations.

```bash
npx prisma generate
npx prisma db push
npm install
npm run dev
```

- The server will run at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

- The app will be available at `http://localhost:5173`.

### 🧪 Sample Seed Script

To populate the database with sample tasks:

```bash
psql -U postgres -h localhost -d reminder_db -f src/models/seed-tasks.sql
```

- Ensure `reminder_db` matches your `.env` database name.

### 📋 API Endpoints

| Method | Endpoint                         | Description                |
| ------ | -------------------------------- | -------------------------- |
| GET    | `/api/tasks`                     | Fetch all tasks            |
| GET    | `/api/reminder-rules`            | Fetch all reminder rules   |
| POST   | `/api/reminder-rules`            | Create a new reminder rule |
| PUT    | `/api/reminder-rules/:id`        | Update a reminder rule     |
| PATCH  | `/api/reminder-rules/:id/toggle` | Toggle rule status         |
| DELETE | `/api/reminder-rules/:id`        | Delete a reminder rule     |
| GET    | `/api/audit-logs`                | Fetch audit logs           |

### 🛡️ Audit Logging

Every reminder rule action is logged with:

- **Action Type**: `create`, `update`, `delete`, `toggle`
- **Timestamp**: ISO 8601 format
- **Task Context**: Associated task details

---

## 🧪 Testing and Development

- **Backend Tests**: Run `npm test` (configure with Jest or similar).
- **Frontend Tests**: Run `npm run test` (configure with Vitest or similar).
- **Linting**: Use `npm run lint` to check code quality.

### Troubleshooting

- **Database Connection Issues**: Verify `.env` settings and PostgreSQL service.
- **CORS Errors**: Ensure the frontend URL is whitelisted in the backend CORS configuration.
- **Migration Failures**: Run `npx prisma db pull` to sync the schema.

---

## 📣 Credits

This project was crafted with precision, scalability, and clean architecture in mind by **Muhammed Hashim**. Contributions and feedback are welcome!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request with a detailed description.

Please adhere to the project's coding standards and include tests where applicable.

---

## 📧 Contact

- **Email**: muhammedhashim6789@gmail.com
- **GitHub**: [muhammedhashim](https://github.com/hashim6789)
