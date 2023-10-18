# Building Management API

## Description

This Building Management API is built to manage information about buildings, including their name, number of floors, and location. The API provides endpoints for creating, retrieving, updating, and deleting building records. It's designed to be a RESTful API, built using JavaScript and the Express.js framework. MongoDB, using the Mongoose ODM, is used to store and manage building data.

## High-Level Overview

- **Language Used**: JavaScript (Node.js)
- **Framework Used**: Express.js
- **Database**: MongoDB with Mongoose
- **API Style**: RESTful

### How It Works

The Building Management API exposes a set of RESTful endpoints that allow users to perform CRUD (Create, Read, Update, Delete) operations on building records. Here's a high-level overview of the endpoints and their functionality:

- **GET /api/buildings**: Retrieve a list of buildings with optional pagination.

- **GET /api/buildings/:id**: Retrieve a single building by its unique ID.

- **POST /api/buildings**: Create a new building by providing its name, number of floors, and location.

- **PUT /api/buildings/:id**: Update an existing building's information.

- **DELETE /api/buildings/:id**: Delete a building by its unique ID.

## Trade-Offs

- **Simplicity Over Complexity**: To keep this project manageable certain advanced features such as authentication and authorization have not been implemented.

- **Rate Limiting**: Rate limiting to prevent abuse or overload of the API could be added in production to ensure fair usage.

## Assumptions

- The API assumes that the client will provide valid and complete data when creating or updating a building. No extensive data validation is implemented in this basic version.

- Authentication and authorization are assumed to be handled by an external service in a real-world application.

## Changes for Production

In a production-ready version, several improvements and features should be considered:

- **Security**: Implement authentication, authorization, and input validation to ensure data integrity and user access control.

- **Logging and Monitoring**: Implement comprehensive logging and monitoring for better visibility into the application's performance and issues.

- **Error Handling**: Implement more detailed and user-friendly error responses to aid debugging and troubleshooting.

- **Rate Limiting and Throttling**: Implement rate limiting and request throttling to protect against abuse and ensure fair usage.

- **Soft delete**: Implement soft Delete in production for non deletion of documents if any mistake occurs it can be retrieved.

## Setup Instructions

1. **Clone the Repository**: `git clone https://github.com/your-repo/building-management-api.git`
2. **Install Dependencies**: `npm install`
3. **Set Up Environment Variables**: Create a `.env` file in config folder
4. **MONGO_URI**: Put your connection String there
5. **NODE_ENV**: development
6. **PORT**: 5000
7. **LOCAL_URL**:http://localhost:5000
7. **SEED FILE**:use the seeder file to put some data in your database using command `node seeder -i` and delete the db with `node seeder -d`
9. **Start the Server in devlopment environment**: `npm run dev`

## Spec Compliance and Time Spent

- **Parts of the Spec Completed**: All specified endpoints (GET, POST, PUT, DELETE) have been implemented. Pagination has been added as an extra feature.

- **Time Spent**: The initial implementation took approximately 4 hours, including creating the Express app, setting up the database, and implementing the endpoints.

- **Challenges Encountered**: A challenge was implementing pagination and ensuring proper error handling.

---
