# MemoTag: AI for Dementia Care

MemoTag is an AI-powered platform designed to support dementia care through cognitive and physical tracking. This project consists of a React frontend and a Node.js/Express backend with PostgreSQL database via Prisma ORM.

## Project Overview

MemoTag aims to address the growing crisis of dementia care by providing:

- Real-time insights for caregivers
- Early detection capabilities
- Personalized care recommendations
- Support for both professional and family caregivers

## Project Structure

```
MemoTag/
├── Frontend/           # React application built with Vite
│   └── my-vite-app/
├── Backend/            # Node.js/Express API
    ├── config/         # Database configuration
    ├── controllers/    # Request handlers
    ├── middleware/     # Express middleware
    ├── prisma/         # Database schema and migrations
    ├── routes/         # API routes
    └── utils/          # Helper utilities
```

## Frontend

### Tech Stack

- React (with Vite)
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API requests

### Key Features

- Responsive design with dark/light mode toggle
- Waitlist signup form
- Contact form
- Sections highlighting the problem, solution, and traction

### Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend/my-vite-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_BASE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Main Components

- `Hero`: Landing section with waitlist signup
- `Navbar`: Navigation with responsive mobile menu
- `Problem`: Information about dementia care challenges
- `Solution`: MemoTag's approach and benefits
- `Traction`: Impact metrics and achievements
- `ContactForm`: User inquiry form

## Backend

### Tech Stack

- Node.js with Express
- PostgreSQL database
- Prisma ORM
- JWT for authentication

### API Endpoints

#### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve contact submissions

#### Waitlist
- `POST /api/waitlist` - Join waitlist
- `GET /api/waitlist` - Retrieve waitlist entries

### Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Database Schema

### Current Schema
- `Contact`: Stores contact form submissions
- `Waitlist`: Manages email waitlist signups

## Security Features

- Password hashing with bcrypt
- JWT authentication for protected routes
- Rate limiting to prevent abuse
- Environment variable configuration for sensitive data

## Development Notes

1. The project has undergone migration from a system to a contact/waitlist system as shown in the migration files.


2. The frontend components are built with a dark/light mode toggle that persists throughout the application.

## Deployment

### Frontend
The frontend can be built for production using:
```bash
cd Frontend/my-vite-app
npm run build
```

### Backend
For production deployment:
1. Set `NODE_ENV=production` in the `.env` file
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```

### Final Output:

[Backend Deployed Link](https://memo-tag.onrender.com)

[Frontend Delpoyed Link](https://memo-tag-ten.vercel.app)
