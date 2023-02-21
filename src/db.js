import { createPool } from "mysql2/promise";
import {DB_PORT, DB_HOST,DB_DATABASE,DB_USER,DB_PASSWORD} from './config.js';

export const pool =createPool({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:"notas_test"
})