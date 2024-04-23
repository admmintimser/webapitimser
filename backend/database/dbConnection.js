import { connect as _connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://timsercrm:preventixpass20@cluster0.xfum3w2.mongodb.net/";

const connectToDB = async () => {
  try {
    const connect = await _connect(MONGO_URI);
    if (connect) console.log(`Mongodb connected - ${connect.connection.host}`);
  } catch (err) {
    console.log(`Database error ${err}`);
  }
};

export { connectToDB }; // Exportación correcta
