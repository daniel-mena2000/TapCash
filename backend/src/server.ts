import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import router from './routes/budgetRouter'

//Diferencias
//sync() → crea las tablas si no existen.
//sync({ alter: true }) → además intenta adaptar las tablas cuando modificas tus modelos durante el desarrollo.
//sync({ force: true }) → elimina y vuelve a crear todas las tablas (borra los datos, úsalo solo si sabes lo que haces).

async function connectDB() {
    try {
        await db.authenticate()
//Este metodo sync nos ayuda a crear las tablas y columnas en la DB en automatico
        await db.sync({ alter: true })
        console.log(colors.bgYellow.blue.bold('Conexion exitosa a la DB'));

    } catch (error) {
        console.log(colors.bgRed.blue.bold('Fallo la conexion a la DB'));
    }
}
connectDB()



const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budgets', router)


export default app
