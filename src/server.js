import express from "express"
import cors from "cors"
import authRoute from "./routes/authRoute.js"
import urlsRoute from "./routes/urlsRoute.js"
import usersRoute from "./routes/usersRoute.js"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRoute);
app.use(urlsRoute);

const port = process.env.PORT || 4000;
app.listen(port, console.log(`Running in port ${port}`));