# StudyNotion EdTech - Backend

This is the backend for the StudyNotion EdTech platform. Built with Node.js, Express, TypeScript, and MongoDB.

## Features


- TypeScript for type safety.
- Express for routing and middleware.
- Environment variable configuration.
- Security middlewares (Helmet, CORS, Morgan).
- Zod for schema validation.

## Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StudyNotion-EdTech/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGODB_URL=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   # Add other environment variables here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Start production server**
   ```bash
   npm run start
   ```

## Project Structure

```
backend/
├── src/
│   ├── app.ts          # Express app configuration
│   ├── index.ts        # Entry point
│   ├── controllers/    # Request handlers
│   ├── models/         # Database schemas
│   ├── routes/         # API routes
│   ├── middlewares/    # Custom middlewares
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types/interfaces
│   └── config/         # Configuration files (DB, Cloudinary, etc.)
├── .env                # Environment variables (ignored)
├── .gitignore          # Git ignore files
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration

