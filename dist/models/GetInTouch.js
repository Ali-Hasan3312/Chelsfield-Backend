"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInTouch = void 0;
const mongoose_1 = require("mongoose");
const GetInTouchSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        trim: true,
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true,
    },
}, { timestamps: true });
exports.GetInTouch = (0, mongoose_1.model)("GetInTouch", GetInTouchSchema);
