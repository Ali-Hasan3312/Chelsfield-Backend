"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipController = void 0;
// import ErrorHandler from "../utils/errorHandler";
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const MembershipController = async (req, res, next) => {
    const { name, dateOfBirth, postCode, email, phoneNumber, address, emergencyContactName, emergencyContactNumber, emergencyRelationship, alternativeEmergencyContact, juniorMembership, studentMembership, regularMembership, socialMembership, medicalInformation } = req.body;
    if (!name || !dateOfBirth || !postCode || !email || !phoneNumber || !address || !emergencyContactName || !emergencyContactNumber || !emergencyRelationship) {
        throw new Error("Please fill all the fields");
    }
    if (!juniorMembership && !studentMembership && !regularMembership && !socialMembership && !medicalInformation) {
        throw new Error("Please select membership type");
    }
    const message = `
        Name: ${name}\n
        Date of Birth: ${dateOfBirth}\n
        Post Code: ${postCode}\n
        Email: ${email}\n
        Phone Number: ${phoneNumber}\n
        Address: ${address}\n
        Emergency Contact Name: ${emergencyContactName}\n
        Emergency Contact Number: ${emergencyContactNumber}\n
        Emergency Relationship: ${emergencyRelationship}\n
        Alternative Emergency Contact: ${alternativeEmergencyContact}\n
        Junior Membership: ${juniorMembership}\n
        Student Membership: ${studentMembership}\n
        Regular Membership: ${regularMembership}\n
        Social Membership: ${socialMembership}\n
        Medical Information: ${medicalInformation}\n
        `;
    try {
        await (0, sendEmail_1.default)({
            email: "alihasan331229@gmail.com",
            subject: `New Membership`,
            message,
        });
    }
    catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send email");
    }
    res.status(200).json({
        success: true,
        message: "Email sent successfully",
    });
};
exports.MembershipController = MembershipController;
