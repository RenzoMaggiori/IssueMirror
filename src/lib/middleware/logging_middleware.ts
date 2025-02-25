import { Request, Response, NextFunction } from "express";
import winston from "winston";

type LogData = {
    timestamp: string;
    method: string;
    url: string;
    ip?: string;
    status?: number;
    duration?: string;
};

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => {
            const levelTag = getLevelTag(level);
            return `${timestamp} ${levelTag}: ${message}`;
        }),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/app.log" }),
    ],
});

export function LoggingMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    res.locals.logger = logger;
    const start = Date.now();
    const url = req.originalUrl;
    const method = req.method;
    const ip = req.ip;

    const logData: LogData = {
        timestamp: new Date().toISOString(),
        method,
        url,
        ip,
    };

    const formattedIP = ip === "::1" ? "localhost" : ip;
    logger.info(
        `${getColoredMethod(method)} ${url} [\x1b[3m${formattedIP}\x1b[0m]`,
    );

    res.on("finish", () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const logLevel =
            status >= 500 ? "error" : status >= 400 ? "warn" : "info";

        logData.status = status;
        logData.duration = `${duration}ms`;

        logger.log(
            logLevel,
            `${getColoredMethod(method)} ${url} → ${status} (${duration}ms)`,
        );
    });

    next();
}

function getColoredMethod(method: string): string {
    const methodColors: { [key: string]: string } = {
        GET: "\x1b[32mGET\x1b[0m",
        POST: "\x1b[34mPOST\x1b[0m",
        PUT: "\x1b[33mPUT\x1b[0m",
        DELETE: "\x1b[31mDELETE\x1b[0m",
        PATCH: "\x1b[35mPATCH\x1b[0m",
    };
    return methodColors[method] || `[${method}]`;
}

function getLevelTag(level: string): string {
    const levelTags: { [key: string]: string } = {
        info: "[\x1b[32mINFO\x1b[0m]",
        warn: "[\x1b[33mWARN\x1b[0m]",
        error: "[\x1b[31mERROR\x1b[0m]",
        debug: "[\x1b[35mDEBUG\x1b[0m]",
    };
    return levelTags[level] || `[${level.toUpperCase()}]`;
}
