// This should be the content of your database.js file
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config();
const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log("Connection with DB successful");
  })
  .catch((err) => {
    console.log("Connection with DB failed");
    console.error(err.message);
  });

export default prisma;