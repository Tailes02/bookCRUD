import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, Request, NextFunction } from "express";

@Injectable ()
export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();
        console.log('LoggingMiddleware triggered'); 

        res.on('finish', () => {
            console.log('Response finished event triggered');

            const duration = Date.now() - start;

            if (duration > 500 || res.statusCode > 302) {
                console.log(`Request took ${duration}ms with status ${res.statusCode}, Request: ${(req).method} ${req.originalUrl}`);
            }
        });
        next();
    }
}