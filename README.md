# Simple Node.js API

A simple and robust Node.js backend API application built with Express.js, featuring Docker support, comprehensive testing, and production-ready configurations.

## Features

- 🚀 **Express.js** - Fast, unopinionated web framework
- 🐳 **Docker** - Containerized for easy deployment
- 🧪 **Testing** - Comprehensive test suite with Jest and Supertest
- 🔒 **Security** - Helmet.js for security headers
- 📝 **Logging** - Morgan for HTTP request logging
- 🌐 **CORS** - Cross-Origin Resource Sharing enabled
- 💻 **Development** - Hot reload with nodemon
- 📊 **Health Checks** - Built-in health monitoring

## API Endpoints

### Base Routes
- `GET /` - Welcome message and API documentation
- `GET /health` - Health check endpoint

### Users API
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Docker and Docker Compose (for containerized deployment)

### Local Development

1. **Clone and setup**
   ```bash
   git clone <your-repo-url>
   cd hostinger-nodejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configurations
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

5. **Run tests**
   ```bash
   npm test
   # or with coverage
   npm run test:coverage
   ```

## Docker Deployment

### Production Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   The API will be available at `http://localhost:3000`

### Development with Docker

1. **Run development environment**
   ```bash
   docker-compose --profile dev up -d
   ```

   The development API will be available at `http://localhost:3001`

### Manual Docker Commands

1. **Build the image**
   ```bash
   docker build -t simple-nodejs-api .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 -e NODE_ENV=production simple-nodejs-api
   ```

## API Usage Examples

### Get all users
```bash
curl http://localhost:3000/users
```

### Create a new user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com"}'
```

### Get user by ID
```bash
curl http://localhost:3000/users/1
```

### Update user
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Smith", "email": "alice.smith@example.com"}'
```

### Delete user
```bash
curl -X DELETE http://localhost:3000/users/1
```

### Health check
```bash
curl http://localhost:3000/health
```

## Testing

The application includes a comprehensive test suite covering all API endpoints.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Project Structure

```
├── src/
│   ├── app.js          # Express application setup
│   └── server.js       # Server entry point
├── tests/
│   └── app.test.js     # API tests
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── .dockerignore      # Docker ignore rules
└── README.md          # Project documentation
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## Production Considerations

- Replace in-memory data store with a proper database (MongoDB, PostgreSQL, etc.)
- Add authentication and authorization
- Implement rate limiting
- Add request validation with a library like Joi or express-validator
- Set up proper logging with structured logs
- Configure monitoring and alerting
- Add API documentation with Swagger/OpenAPI

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 