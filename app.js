import express from "express";
import { connectToDB } from "./database/dbConnection.js";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();

app.use(express.static("./frontend/dist"));
app.get("*",(req,res) =>{
  res.sendFile(path.resolve(__dirname,"frontend", "dist", "index.html"))
});

// app.use(express.static("../dashboard/dist"));
// app.get("*",(req,res) =>{
//   res.sendFile(path.resolve(__dirname,"dashboard", "dist", "index.html"))
// });


// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
//     method: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// const PORT = process.env.PORT || 4000;
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";
// const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";
connectToDB().then((_) => {
  app.listen(process.env.PORT, (_) => {
    console.log(`Server started on port ${process.env.PORT}`);
    console.log(app.get('env')); 
  });
});




app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// No es necesario llamar a dbConnection() ya que lo hacemos arriba con connectToDB()
// dbConnection();
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    errors: [
      {
        msg: "Route not found",
      },
    ],
  });
});

app.use(errorMiddleware);
export default app;
