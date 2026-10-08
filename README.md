# Restaurant Backend

Backend REST API for a restaurant / food delivery system, built with Node.js, Express and MongoDB. It also uses Socket.IO for real-time communication.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Real-time:** Socket.IO
- **Other:** CORS, dotenv

## Features
- RESTful API built with Express
- MongoDB data modelling with Mongoose
- Real-time updates using Socket.IO
- Environment-based configuration with dotenv
- CORS enabled for frontend integration

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- npm
- A MongoDB database (local or MongoDB Atlas)

### Installation
```bash
git clone https://github.com/gehanyasiru36-cpu/restaurant-backend.git
cd restaurant-backend
npm install
```

### Environment Variables
Create a `.env` file in the project root and add your own values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

> Never commit your `.env` file to GitHub.

### Run the Server
```bash
npm start
```

## Related Repositories
- [restaurant-frontend](https://github.com/gehanyasiru36-cpu/restaurant-frontend)

## Author
**Your Name**
[LinkedIn](https://www.linkedin.com/in/your-profile) | [GitHub](https://github.com/gehanyasiru36-cpu)
