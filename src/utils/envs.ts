import * as dotenv from 'dotenv';


dotenv.config();

interface EnvVars {
    NAME_DB: string
}

export const envs: EnvVars = {
    NAME_DB: process.env.NAME_DB
}