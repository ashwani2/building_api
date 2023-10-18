
require("dotenv").config({
    path: "./config/config.env",
  });
const request = require('supertest');
const app = `${process.env.LOCAL_URL}` 

describe('Building Routes', () => {
  
  // Test GET /api/buildings
  describe('GET /api/buildings', () => {
    it('should get a list of buildings', async () => {
      const response = await request(app).get('/api/buildings');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  // Test GET /api/buildings/:id
  describe('GET /api/buildings/:id', () => {
    it('should get a single building by ID', async () => {
      const response = await request(app).get('/api/buildings/c9b69fe2-592d-11ed-9214-5f7444821e86'); 
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should handle a non-existent building ID', async () => {
      const response = await request(app).get('/api/buildings/fae53fda-4068-49f1-9e13-8587be240a5');
      expect(response.status).toBe(404);
    });
  });

  // Test POST /api/buildings
  describe('POST /api/buildings', () => {
    it('should create a new building', async () => {
      const newBuilding = {
        name: 'New Building',
        floors: 5,
        location: 'New Location',
      };

      const response = await request(app)
        .post('/api/buildings')
        .send(newBuilding);
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });

    it('should handle missing parameters', async () => {
      const response = await request(app).post('/api/buildings').send({});
      expect(response.status).toBe(400);
    });
  });

  // Test PUT /api/buildings/:id
  describe('PUT /api/buildings/:id', () => {
    it('should update a building by ID', async () => {
      const updatedBuilding = {
        name: 'Updated Building',
        floors: 7,
        location: 'Updated Location',
      };

      const response = await request(app)
        .put('/api/buildings/c9b69fe2-592d-11ed-9214-5f7444821e86') // Replace with a valid ID
        .send(updatedBuilding);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should handle a non-existent building ID', async () => {
      const response = await request(app).put('/api/buildings/fae53fda-4068-49f1-9e13-8587be240a5').send({});
      expect(response.status).toBe(404);
    });

    
  });

  // Test DELETE /api/buildings/:id
  describe('DELETE /api/buildings/:id', () => {
    it('should delete a building by ID', async () => {
      const response = await request(app).delete('/api/buildings/c9b69fe2-592d-11ed-9214-5f7444821e86'); // Replace with a valid ID
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should handle a non-existent building ID', async () => {
      const response = await request(app).delete('/api/buildings/fae53fda-4068-49f1-9e13-8587be240a5');
      expect(response.status).toBe(404);
    });
  });
});
