import { readFileSync } from "fs";
import { join } from "path";
interface GlobalConfigModel {
    database: {
        host: string,
        username: string,
        password: string,
        db_name: string,
        port: number,
        max_connections: number
    };
    api_details: {
        app_version: number,
        api_port: number,
    };
    settings: {
        log_dir: string
    };
}
export class ConfigurationManager {
    public static globalConfig: GlobalConfigModel;

    public static readConfig(fileName: "global" | "payment") {
        let configJson = JSON.parse(readFileSync(join(__dirname, '../configs', fileName + ".json"), 'utf8'));
        if (fileName === "global") {
            ConfigurationManager.globalConfig = configJson;
        } else if (fileName === "payment") {
        }
    }
}