import { Request, Response, NextFunction } from "express";

export function ExceptionMiddleware(
    err: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) {
    console.error("Error caught by ExceptionMiddleware:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
}
