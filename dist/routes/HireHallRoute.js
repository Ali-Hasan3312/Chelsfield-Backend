"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HireHallController_1 = require("../controllers/HireHallController");
const HireHallRouter = express_1.default.Router();
HireHallRouter.post('/hireHall', HireHallController_1.HireHallController);
exports.default = HireHallRouter;
