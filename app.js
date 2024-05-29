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
import dashboardRoutes from './router/dashboardRoutes.js';

const app = express();

// Allowed origins list
const allowedOrigins = [
    'https://cuestionariopreventix.azurewebsites.net',
    'https://cuestionariopreventixmhs.azurewebsites.net',
    'https://dashboardtimser.azurewebsites.net',
    'https://dashboardmhs.azurewebsites.net'
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
    credentials: true  // Allow credentials (cookies, authorization headers, etc.)
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));  // Use the flexible CORS configuration
app.use(helmet());

// API Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use('/api/v1', dashboardRoutes);

// Error Middleware
app.use(errorMiddleware);

// Connect to Database
connectToDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
