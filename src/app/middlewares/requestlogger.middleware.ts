import express = require('express');
import { BunyanHelper } from '../services/BunyanHelper';


export class RequestLoggerMiddleware {
    public static RegisterRequestLogger(app: express.Application): express.Application {
        app.use((request, response, next) => {
            BunyanHelper.requestLogger.warn({ req: request, res: response }, "Request Response");
            next();
        });

        return app;
    }
}