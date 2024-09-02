import express from "express";
import { connectToDB } from "./database/dbConnection.js";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from 'helmet';
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import dashboardClientesRouter from './router/dashboardClientesRouter.js';
import preventixRouter from './router/preventixRouter.js';
import clienteRouter from './router/clienteRouter.js';
import cuestionarioRouter from './router/cuestionarioRouter.js';

const app = express();

// Allowed origins list
const allowedOrigins = [
    'https://cuestionariopreventix.azurewebsites.net',
    'https://cuestionariopreventixmhs.azurewebsites.net',
    'https://dashboardtimser.azurewebsites.net',
    'https://dashboardmhs.azurewebsites.net',
    'https://usanapreventix.azurewebsites.net',
    'https://preventix.azurewebsites.net',
    'https://previtabypreventix.azurewebsites.net'
];

// Flexible CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);  // Allow requests with no origin (like mobile apps or curl requests)
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`Blocked CORS request from disallowed origin: ${origin}`);
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    method: [
        "GET", "POST", "DELETE", "PUT"
    ],
    credentials: true , // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));  // Use the flexible CORS configuration
app.use(helmet());

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use('/api/v1', dashboardClientesRouter);
app.use("/api/v1/preventix", preventixRouter);  
app.use("/api/v1/cliente", clienteRouter);  
app.use("/api/v1/cuestionario", cuestionarioRouter);

// Error Middleware
app.use(errorMiddleware);

// Connect to Database
connectToDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
