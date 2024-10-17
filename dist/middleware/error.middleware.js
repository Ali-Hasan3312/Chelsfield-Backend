"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
exports.errorMiddleware = errorMiddleware;
const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
exports.TryCatch = TryCatch;
