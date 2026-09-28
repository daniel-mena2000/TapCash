import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config()

//Instancia de la DB
export const db =  new Sequelize( process.env.DATABASE_URL, {
//Esto configura cómo Sequelize (a través del driver pg) establece la conexión SSL con PostgreSQL.
//Aqui estamos diciendo que en la carpeta "model" son modelos y lo va a sincronizar en automatico y va a generar las tablas que estemos creando
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
             rejectUnauthorized: false
        }
    }
})
