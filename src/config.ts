import dotenv from 'dotenv';
import Joi from 'joi';

// Load environment variables from .env file
dotenv.config();

const envSchema = Joi.object({
    APP_PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PORT: Joi.number().required().default(3306),
    LOG_DIR: Joi.string().required(),
}).unknown().required();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

class Config {
    public APP_PORT: number = Number(envVars.APP_PORT);
    public DB_HOST: string = envVars.DB_HOST;
    public DB_USER: string = envVars.DB_USER;
    public DB_PASSWORD: string = envVars.DB_PASSWORD;
    public DB_NAME: string = envVars.DB_NAME;
    public DB_PORT: number = Number(envVars.DB_PORT);
    public LOG_DIR: string = envVars.LOG_DIR;
}

const config = new Config();
export default config;