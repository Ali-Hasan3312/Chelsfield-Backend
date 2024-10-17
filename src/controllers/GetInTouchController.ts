import { Request, Response, NextFunction } from 'express';
import { GetInTouch } from "../models/GetInTouch";
// import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail"
export const GetInTouchController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
            await sendEmail({
                email: "alihasan331229@gmail.com",
                subject: `
                ${name} is trying to contact you`,
                message: storedMessage,
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