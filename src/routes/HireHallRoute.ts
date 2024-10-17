import express from "express"
import {HireHallController}  from "../controllers/HireHallController"

const HireHallRouter = express.Router();

HireHallRouter.post('/hireHall', HireHallController);

export default HireHallRouter;