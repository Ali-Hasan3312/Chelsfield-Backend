import { NextFunction, Request, Response } from 'express';
// import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";
export const HireHallController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
            await sendEmail({
                email: "alihasan331229@gmail.com",
                subject: `
                ${name} wants to hire a hall `,
                message: storedMessage,
               
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