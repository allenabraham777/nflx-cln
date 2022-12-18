import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import "colors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

userRoutes(app);

const initApp = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("=== DB connection established ===".bgGreen.black);
    app.listen(process.env.PORT, () =>
      console.log(
        `=== Server listening on port ${`${process.env.PORT}`.bold} ===`.bgCyan
          .black
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initApp();
