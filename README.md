# MoveInSync - Carpooling System

![MoveInSync Server Running](./docs/assets/server-running.png)

## Overview
MoveInSync is a modern carpooling system that connects drivers with riders, making commuting more efficient and environmentally friendly. The platform features real-time ride matching, user authentication, and a sophisticated ride management system.

## Features
- 🚗 Real-time ride matching and tracking
- 👥 User authentication and authorization
- 🗺️ Location-based ride search
- 💰 Ride fare calculation
- ⭐ Rating system for drivers and riders
- 🔍 Advanced ride filtering based on preferences
- 📊 Prometheus metrics integration
- 📈 Grafana dashboard support

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Monitoring**: Prometheus & Grafana
- **Real-time Communication**: Socket.IO
- **Documentation**: Swagger/OpenAPI

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Docker & Docker Compose (for monitoring setup)
- Redis (for caching)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moveinsync.git
cd moveinsync
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory:
```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Rides
- POST `/api/rides/createRide` - Create a new ride
- GET `/api/rides/getRides` - Get all rides
- GET `/api/rides/bestRides` - Get best matching rides
- PUT `/api/rides/:id/request` - Request to join a ride
- PUT `/api/rides/:id/approval` - Approve/reject ride request

## Monitoring Setup

The project includes Prometheus and Grafana setup for monitoring:

1. Start the monitoring stack:
```bash
docker-compose up -d
```

2. Access monitoring dashboards:
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin)

## Project Structure
```
moveinsync-server/
├── controllers/
│   ├── auth.js
│   └── rides.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Ride.js
│   └── User.js
├── routes/
│   ├── auth.js
│   └── rides.js
├── docker-compose.yml
├── prometheus.yml
├── server.js
└── package.json
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Demo
[Link to demo video]

## Contact
Your Name - [@yourusername](https://twitter.com/yourusername)
Project Link: [https://github.com/yourusername/moveinsync](https://github.com/yourusername/moveinsync) 