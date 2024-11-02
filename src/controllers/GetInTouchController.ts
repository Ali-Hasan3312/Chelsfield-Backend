import { Request, Response, NextFunction } from 'express';
import { GetInTouch } from "../models/GetInTouch";
import * as XLSX from 'xlsx';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import sendEmail from "../utils/sendEmail"
export const GetInTouchController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
      const { name, email, phone, message } = req.body;
      console.log("Name:", name);
      
        if (!name || !email || !phone || !message) {
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
        Message: ${message}`;
        try {
            await sendEmail({
                email: "info@chelsfieldcc.co.uk",
                subject: `
                ${name} is trying to contact with you`,
                message: storedMessage,
                attachments: [
                    {
                        filename: 'getInTouch_data.xlsx',
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
        });
      
};