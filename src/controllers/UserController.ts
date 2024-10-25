import { Request, Response, NextFunction } from 'express';
import { Member } from '../models/UserModel';
import sendEmail from '../utils/sendEmail';

export const MembershipController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        fullName,
        dateOfBirth,
        postcode,
        email,
        mobileNumber,
        address,
        emergencyContactName,
        emergencyPhone,
        relationship,
        alternativePhone,
        membershipType,
        medicalInfo
    } = req.body;

    // Check for required fields
    if (
        !fullName ||
        !dateOfBirth ||
        !postcode ||
        !email ||
        !mobileNumber ||
        !address ||
        !emergencyContactName ||
        !emergencyPhone ||
        !relationship ||
        !membershipType
    ) {
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
        await sendEmail({
            email: 'alihasan331229@gmail.com',
            subject: `New Membership`,
            message,
        });

        res.status(200).json({
            success: true,
            message: 'Email sent successfully',
        });
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send email');
    }
};
