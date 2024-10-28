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
exports.MembershipController = void 0;
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const XLSX = __importStar(require("xlsx"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const MembershipController = async (req, res, next) => {
    const { fullName, dateOfBirth, postcode, email, mobileNumber, address, emergencyContactName, emergencyPhone, relationship, alternativePhone, membershipType, medicalInfo } = req.body;
    // Check for required fields
    if (!fullName ||
        !dateOfBirth ||
        !postcode ||
        !email ||
        !mobileNumber ||
        !address ||
        !emergencyContactName ||
        !emergencyPhone ||
        !relationship ||
        !membershipType) {
        throw new Error('Please fill all the required fields.');
    }
    const data = [
        {
            'Field': 'Full Name',
            'Value': fullName,
        },
        {
            'Field': 'Date of Birth',
            'Value': dateOfBirth,
        },
        {
            'Field': 'Post Code',
            'Value': postcode,
        },
        {
            'Field': 'Email',
            'Value': email,
        },
        {
            'Field': 'Mobile Number',
            'Value': mobileNumber,
        },
        {
            'Field': 'Address',
            'Value': address,
        },
        {
            'Field': 'Emergency Contact Name',
            'Value': emergencyContactName,
        },
        {
            'Field': 'Emergency Contact Phone',
            'Value': emergencyPhone,
        },
        {
            'Field': 'Relationship',
            'Value': relationship,
        },
        {
            'Field': 'Alternative Contact Phone',
            'Value': alternativePhone || 'N/A',
        },
        {
            'Field': 'Membership Type',
            'Value': membershipType,
        },
        {
            'Field': 'Medical Information',
            'Value': medicalInfo || 'None',
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
    // Prepare email with attachment
    const emailOptions = {
        email: 'alihasan331229@gmail.com',
        subject: `New Membership`,
        message: `New membership registration data attached.`,
        attachments: [
            {
                filename: 'membership_data.xlsx',
                path: filePath,
            },
        ],
    };
    try {
        await (0, sendEmail_1.default)(emailOptions);
        res.status(200).json({
            success: true,
            message: 'Email sent successfully',
        });
    }
    catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send email');
    }
};
exports.MembershipController = MembershipController;
