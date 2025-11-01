# Forever Living Products

A full-stack e-commerce application for Forever Living Products built with React, Express, MongoDB, and TailwindCSS.

## Features

- Product catalog with categories
- Product search functionality
- Responsive design for mobile and desktop
- MongoDB database integration
- Modern UI with shadcn/ui components

## Local Development Setup

### Prerequisites

- Node.js 20 or higher
- MongoDB database (local or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=5000
   NODE_ENV=development
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5000`

## Building for Production

```bash
npm run build
npm run start
```

## Deployment Options

### Recommended: Render (Full-Stack)

Render is ideal for this full-stack application with MongoDB:

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your repository
4. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
   - Add environment variable: `MONGODB_URI`
5. Deploy!

### Alternative: Railway

1. Push your code to GitHub
2. Connect to [Railway](https://railway.app)
3. Add your repository
4. Set environment variable: `MONGODB_URI`
5. Deploy automatically

### Netlify (Static Only - Not Recommended for This App)

**Note**: Netlify is designed for static sites. For this full-stack app with MongoDB, use Render or Railway instead.

If you want to deploy on Netlify:
1. You'll need to separate the frontend and backend
2. Deploy frontend to Netlify as static site
3. Deploy backend API to Render/Railway
4. Update API endpoints in frontend to point to your backend URL

## Environment Variables

- `MONGODB_URI`: MongoDB connection string (required)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)

## Tech Stack

- **Frontend**: React, TailwindCSS, shadcn/ui, Wouter (routing)
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Build Tool**: Vite
- **Deployment**: Netlify (serverless)
