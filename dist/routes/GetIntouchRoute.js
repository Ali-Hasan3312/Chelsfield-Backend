"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GetInTouchController_1 = require("../controllers/GetInTouchController");
const GetInTouchRouter = express_1.default.Router();
GetInTouchRouter.post('/touch', GetInTouchController_1.GetInTouchController);
exports.default = GetInTouchRouter;
