import { NextFunction, Request, Response } from 'express';
// import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";
import * as XLSX from 'xlsx';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
export const HireHallController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        
        // Check if the uploads directory exists, if not create it
        if (!existsSync(uploadsDir)) {
            mkdirSync(uploadsDir);
        }
        const filePath = path.join(__dirname, '..', 'uploads', 'membership_data.xlsx');
        // Write the workbook to a file
        writeFileSync(filePath, XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }));
        const storedMessage = `
        Name: ${name}
        Email: ${email}
        Phone Number: ${phone}
        Facility Type: ${bookingType}
        Message: ${message}
        `;
        console.log(storedMessage);
        
        
        try {
            await sendEmail({
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
        } catch (error) {
            console.error("Failed to send email:", error);
            throw new Error("Failed to send email")
        }
        res.status(200).json({
            success: true,
            message: "Message Sent Successfully",
            storedMessage
        });
      
};