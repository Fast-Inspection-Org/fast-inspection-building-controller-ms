import * as dotenv from 'dotenv';


dotenv.config();

interface EnvVars {
    NAME_DB: string
    PORT: string
    CONFIGS_SERVICE_HOST: string
    CONFIGS_SERVICE_PORT: string
}

export const envs: EnvVars = {
    NAME_DB: process.env.NAME_DB,
    PORT: process.env.PORT,
    CONFIGS_SERVICE_HOST: process.env.CONFIGS_SERVICE_HOST,
    CONFIGS_SERVICE_PORT: process.env.CONFIGS_SERVICE_PORT
}