import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

dotenv.config()
const app = express();

import { cors } from "./config/cors.js";
import { connect, mongoRules } from "./config/default.js";
import { swaggerOptions } from "./config/swagger-options.js";
import indexRouter from "./routes/index.js";
import restaurantRouter from "./routes/restaurant.js";
import usersRouter from "./routes/user.js";

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// connect ke database mongoDB
mongoose.connect(connect.databaseUri, mongoRules);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected!'));

// middleware 
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/', indexRouter);
app.use('/restaurants', cors(), restaurantRouter);
app.use('/users', cors(), usersRouter);

// listening to port
app.listen(connect.applicationPort, async () => {
    try {
        console.log(`Server Running at ${connect.applicationUri}:${connect.applicationPort}`)
    } catch (error) {
        throw new Error('Oops!, Something Wrong!');
    }
});