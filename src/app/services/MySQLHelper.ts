import mysql, { PoolOptions, ResultSetHeader } from 'mysql2/promise';
import { BunyanHelper } from './BunyanHelper';
import config from '../../config';

export class MySQLHelper {
    public static access: PoolOptions = {
        host: config.DB_HOST,
        port: config.DB_PORT,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        connectTimeout: 111111111,
        waitForConnections: true,
        connectionLimit: 50,
        queueLimit: 0,
        multipleStatements: true
    };

    private static conn = mysql.createPool(MySQLHelper.access);

    /**
     * Executes Query
     * @param sql sql statement (prepared) to execute
     * @param args arguments array for question marks
     */
    public static async executeQuery(sql: string, args?: any): Promise<[mysql.QueryResult, mysql.FieldPacket[]]> {
        try {

            const results = await MySQLHelper.conn.query(sql, args);

            return results;
        } catch (error) {
            BunyanHelper.errorLogger.error(error);
            console.error(error);
            throw error;
        } finally {

        }
    }

    public static async executeResult(sql: string, args?: any): Promise<[mysql.QueryResult, mysql.FieldPacket[]]> {
        try {

            const results = await MySQLHelper.conn.execute(sql, args);

            return results;
        } catch (error) {
            BunyanHelper.errorLogger.error(error);
            console.error(error);
            throw error;
        } finally {

        }
    }

    public static isResultSetHeader = (data: unknown): data is ResultSetHeader => {
        if (!data || typeof data !== 'object') return false;

        const keys = [
            'fieldCount',
            'affectedRows',
            'insertId',
            'info',
            'serverStatus',
            'warningStatus',
            'changedRows',
        ];

        return keys.every((key) => key in data);
    };

}