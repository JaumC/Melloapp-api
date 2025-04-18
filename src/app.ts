import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect_db from './config/db';
import router from './routes/router';

import http from 'http';

dotenv.config();

const app = express();
const port = parseInt(process.env.API_PORT || '3000', 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin: '*', 
    credentials: true 
}));
app.use(cookieParser());

connect_db();

const server = http.createServer(app);

app.use('/', router);

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
