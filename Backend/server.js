import prisma from "./config/database.js";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import limiter from "./middleware/rateLimiter.js"
import {errorHandler} from "./middleware/responseHandler.js"
import contactRoutes from './routes/contactRoutes.js'
import waitlistRoutes from './routes/waitlistRoutes.js'

config();

const PORT = Number(process.env.PORT);

const app = express();

app.use(cors());

app.use(express.json());
app.use(limiter);


app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use('/api', contactRoutes);
app.use('/api', waitlistRoutes);



app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});







