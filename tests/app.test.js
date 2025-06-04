const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return welcome message and endpoints info', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('Users API', () => {
    describe('GET /users', () => {
      it('should return all users', async () => {
        const response = await request(app).get('/users');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('count');
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });

    describe('GET /users/:id', () => {
      it('should return a specific user', async () => {
        const response = await request(app).get('/users/1');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id', 1);
      });

      it('should return 404 for non-existent user', async () => {
        const response = await request(app).get('/users/999');
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'User not found');
      });
    });

    describe('POST /users', () => {
      it('should create a new user', async () => {
        const newUser = {
          name: 'Test User',
          email: 'test@example.com'
        };
        
        const response = await request(app)
          .post('/users')
          .send(newUser);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('name', newUser.name);
        expect(response.body.data).toHaveProperty('email', newUser.email);
        expect(response.body.data).toHaveProperty('id');
      });

      it('should return 400 for missing required fields', async () => {
        const response = await request(app)
          .post('/users')
          .send({ name: 'Test User' }); // missing email
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Name and email are required');
      });

      it('should return 409 for duplicate email', async () => {
        const response = await request(app)
          .post('/users')
          .send({
            name: 'Another User',
            email: 'john@example.com' // email already exists
          });
        
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'User with this email already exists');
      });
    });

    describe('PUT /users/:id', () => {
      it('should update an existing user', async () => {
        const updatedUser = {
          name: 'Updated User',
          email: 'updated@example.com'
        };
        
        const response = await request(app)
          .put('/users/1')
          .send(updatedUser);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('name', updatedUser.name);
        expect(response.body.data).toHaveProperty('email', updatedUser.email);
      });

      it('should return 404 for non-existent user', async () => {
        const response = await request(app)
          .put('/users/999')
          .send({
            name: 'Test User',
            email: 'test@example.com'
          });
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'User not found');
      });
    });

    describe('DELETE /users/:id', () => {
      it('should delete an existing user', async () => {
        const response = await request(app).delete('/users/2');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
      });

      it('should return 404 for non-existent user', async () => {
        const response = await request(app).delete('/users/999');
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'User not found');
      });
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Route not found');
    });
  });
}); 