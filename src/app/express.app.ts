import express = require('express');
import cors from "cors";
import { RequestLoggerMiddleware } from './middlewares/requestlogger.middleware';
import { AccountsRoutes } from './routes/accounts.routes';

export class ExpressApp {

    public app: express.Application = express();

    constructor() {
        this.setup();
    }

    private setup(): void {
        // Enable 'trust proxy' to allow Express to trust the 'X-Forwarded-*' headers.
        // This is necessary when the app is behind a reverse proxy or load balancer (e.g., Nginx, AWS ELB).
        // It ensures that req.ip reflects the client's IP address, and req.protocol indicates the correct protocol (HTTP/HTTPS).
        this.app.enable('trust proxy');

        // Enable CORS for all routes
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app = RequestLoggerMiddleware.RegisterRequestLogger(this.app);

        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.app.use('/accounts', new AccountsRoutes(express).router);
    }


}
