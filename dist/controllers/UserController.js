"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipController = void 0;
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
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
    const message = `
    New Membership Registration\n
    Name: ${fullName}\n
    Date of Birth: ${dateOfBirth}\n
    Post Code: ${postcode}\n
    Email: ${email}\n
    Mobile Number: ${mobileNumber}\n
    Address: ${address}\n
    Emergency Contact Name: ${emergencyContactName}\n
    Emergency Contact Phone: ${emergencyPhone}\n
    Relationship: ${relationship}\n
    Alternative Contact Phone: ${alternativePhone || 'N/A'}\n
    Membership Type: ${membershipType}\n
    Medical Information: ${medicalInfo || 'None'}
    `;
    try {
        await (0, sendEmail_1.default)({
            email: 'alihasan331229@gmail.com',
            subject: `New Membership`,
            message,
        });
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
