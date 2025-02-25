import { Request, Response, NextFunction } from "express";

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export function ExceptionMiddleware(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    console.error("Error caught by ExceptionMiddleware:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
}
