import express from "express"
import { GetInTouchController }  from "../controllers/GetInTouchController"

const GetInTouchRouter = express.Router();
GetInTouchRouter.post('/touch', GetInTouchController);
export default GetInTouchRouter;