import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Memberrouter from "./routes/UserRoute";
import GetInTouchRouter from "./routes/GetIntouchRoute";
import HireHallRouter from "./routes/HireHallRoute";

const app = express()
dotenv.config({path: "./config/config.env"})

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'https://chelsefieldcricketclub.hymglobal.com',
    credentials: true
}));
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
app.use("/api/v1",Memberrouter)
app.use("/api/v1",GetInTouchRouter)
app.use("/api/v1",HireHallRouter)
