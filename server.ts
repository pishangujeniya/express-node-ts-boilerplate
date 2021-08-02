import { ConfigurationManager } from './app/helpers/CofigurationManager';
ConfigurationManager.readConfig("global");

import { App } from './app/app';
import { BunyanHelper } from './app/helpers/BunyanHelper';

var PORT = ConfigurationManager.globalConfig.api_details.api_port;

let app = new App();

app.app.listen(PORT, () => {
    BunyanHelper.activityLogger.info("Server running on : " + PORT);
});