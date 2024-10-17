import express from "express"
import {MembershipController}  from "../controllers/UserController"

const Memberrouter = express.Router();

Memberrouter.post('/join', MembershipController);

export default Memberrouter;