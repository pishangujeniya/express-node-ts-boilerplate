import { ExpressApp } from './app/express.app';
import { BunyanHelper } from './app/services/BunyanHelper';
import config from './config';

let app = new ExpressApp();

app.app.listen(config.APP_PORT, () => {
    BunyanHelper.activityLogger.info(`Server running on : ${config.APP_PORT}`);
});