"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HireHallController = void 0;
// import ErrorHandler from "../utils/errorHandler";
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const XLSX = __importStar(require("xlsx"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const HireHallController = async (req, res, next) => {
    const { name, email, phone, bookingType, message } = req.body;
    if (!name || !email || !phone || !bookingType || !message) {
        throw new Error("Please fill all the fields");
    }
    const data = [
        {
            'Field': 'Full Name',
            'Value': name,
        },
        {
            'Field': 'Email',
            'Value': email,
        },
        {
            'Field': 'Phone Number',
            'Value': phone,
        },
        {
            'Field': 'Facility',
            'Value': bookingType,
        },
        {
            'Field': 'Message',
            'Value': message,
        },
    ];
    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Membership Data');
    // Create a file path
    const uploadsDir = path_1.default.join(__dirname, '..', 'uploads');
    // Check if the uploads directory exists, if not create it
    if (!(0, fs_1.existsSync)(uploadsDir)) {
        (0, fs_1.mkdirSync)(uploadsDir);
    }
    const filePath = path_1.default.join(__dirname, '..', 'uploads', 'membership_data.xlsx');
    // Write the workbook to a file
    (0, fs_1.writeFileSync)(filePath, XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }));
    const storedMessage = `
        Name: ${name}
        Email: ${email}
        Phone Number: ${phone}
        Facility Type: ${bookingType}
        Message: ${message}
        `;
    console.log(storedMessage);
    try {
        await (0, sendEmail_1.default)({
            email: "admin@chelsfieldcc.co.uk",
            subject: `
                ${name} wants to ${bookingType} `,
            message: storedMessage,
            attachments: [
                {
                    filename: 'facility_data.xlsx',
                    path: filePath,
                },
            ],
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
