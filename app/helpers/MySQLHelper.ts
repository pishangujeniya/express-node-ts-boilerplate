import * as mysql from 'mysql2';
import { BunyanHelper } from './BunyanHelper';
import { ConfigurationManager } from './CofigurationManager';
export class MySQLHelper {
    
    private static host = ConfigurationManager.globalConfig.database.host;
    private static port =  ConfigurationManager.globalConfig.database.port;
    private static username =  ConfigurationManager.globalConfig.database.username;
    private static password =  ConfigurationManager.globalConfig.database.password;
    private static database =  ConfigurationManager.globalConfig.database.db_name;
    private static maxConnectionLimit =  ConfigurationManager.globalConfig.database.max_connections;

    private static mysqlPool = mysql.createPool(
        {
            host: MySQLHelper.host,
            port: MySQLHelper.port,
            user: MySQLHelper.username,
            password: MySQLHelper.password,
            database: MySQLHelper.database,
            connectTimeout: 111111111,
            waitForConnections: true,
            connectionLimit: MySQLHelper.maxConnectionLimit,
            queueLimit: 0,
            multipleStatements: true
        }
    );

    private static promisePool = MySQLHelper.mysqlPool.promise();

    /**
     * Executes Query
     * @param sql sql statement (prepared) to execute
     * @param args arguments array for question marks
     */
    public static async executeQuery(sql: string, args?: any) {
        try {

            const results = await MySQLHelper.promisePool.query(sql, args);

            return results;
        } catch (error) {
            BunyanHelper.errorLogger.error(error);
            console.error(error);
            throw error;
        } finally {

        }
    }

}