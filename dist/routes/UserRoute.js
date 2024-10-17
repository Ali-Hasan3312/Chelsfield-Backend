"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const Memberrouter = express_1.default.Router();
Memberrouter.post('/join', UserController_1.MembershipController);
exports.default = Memberrouter;
