const request = require('supertest');
const app = require('../../api/__tests__/index.test'); // Update the path to your Express app file

describe('POST /register', () => {
  it('should register a new user and return 201 status', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe(
      'Registration successful. Please check your email for verification.'
    );
  });
});

describe('GET /verify/:token', () => {
  // Replace 'your_verification_token_here' with a valid verification token for testing
  const verificationToken = 'your_verification_token_here';

  it('should verify user email with a valid token', async () => {
    const res = await request(app).get(`/verify/${verificationToken}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Email verified successfully');
  });

  it('should return 404 status for invalid verification token', async () => {
    const res = await request(app).get('/verify/invalidtoken');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Invalid verification token');
  });
});

describe('POST /login', () => {
  it('should log in an existing user and return 200 status with a token', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 status for invalid email or password', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid email or password');
  });
});
