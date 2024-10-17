"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInTouchController = void 0;
// import ErrorHandler from "../utils/errorHandler";
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const GetInTouchController = async (req, res, next) => {
    const { name, email, phoneNumber, message } = req.body;
    console.log("Name:", name);
    if (!name || !email || !phoneNumber || !message) {
        throw new Error("Please fill all the fields");
    }
    const storedMessage = `
        Name: ${name}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Message: ${message}`;
    try {
        await (0, sendEmail_1.default)({
            email: "alihasan331229@gmail.com",
            subject: `
                ${name} is trying to contact you`,
            message: storedMessage,
        });
    }
    catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send email");
    }
    res.status(200).json({
        success: true,
        message: "Message Sent Successfully",
    });
};
exports.GetInTouchController = GetInTouchController;
