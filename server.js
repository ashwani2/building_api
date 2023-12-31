const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const helmet=require("helmet")
const mongoSanitize=require("express-mongo-sanitize");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");

//load env vars
dotenv.config({
    path: "./config/config.env",
  });
  //connect to database
  connectDB();

  //Route file
  const buildings = require("./routes/buildings");
  
  const app = express();
  
  
  //Body Parser
  app.use(express.json());
  
  
  // dev logging middleware
  if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
  }
  
  // Sanitize data
  app.use(mongoSanitize())  // to prevent us from NO-SQL injection
  
  // Set Security headers
  app.use(helmet())

  //Mount Routers
  app.use("/api/buildings",buildings);

  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  
  const server = app.listen(
    PORT,
    console.log(
      `Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
    )
  );
  
  //Handle unhandled promise rejections
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close Server and exit process
    server.close(() => process.exit(1));
  });