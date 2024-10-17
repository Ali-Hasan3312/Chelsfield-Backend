"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HireHallController = void 0;
// import ErrorHandler from "../utils/errorHandler";
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const HireHallController = async (req, res, next) => {
    const { name, email, phoneNumber, option, message } = req.body;
    if (!name || !email || !phoneNumber || !option || !message) {
        throw new Error("Please fill all the fields");
    }
    const storedMessage = `
        Name: ${name}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Option: ${option}
        Message: ${message}
        `;
    try {
        await (0, sendEmail_1.default)({
            email: "alihasan331229@gmail.com",
            subject: `
                ${name} wants to hire a hall `,
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
        storedMessage
    });
};
exports.HireHallController = HireHallController;
