import type { Request, Response } from 'express'
import Expense from '../models/Expense'

//GASTOS CONTROLLER
//api/budgets/10/expenses <- Esta sera la ruta de expenses ya que tiene que saber a que id de budget(presupuesto) se tiene que agregar el expense(gasto) y como ya estamos en la ruta de budget ya nos ahorramos el validar el formato con validateBudgetId y validateBudgetExists esto se le conoce como un patron ROA(Arquitectura basada en recursos)
export class ExpensesController {

// Tenemos 2 opciones para recuperar el ID del presupuesto:
    // 1. Desde el parámetro de la URL: req.params.budgetId
    // 2. Desde el objeto budget que recuperamos de la DB: req.budget.id
    // Es mejor utilizar req.budget.id porque este objeto ya fue
    // recuperado y validado desde la base de datos.
    // De esta forma, usamos la BD como fuente de verdad.

    // console.log(req.params.budgetId); // Ejemplo: 1
    // console.log(req.budget.id);       // Ejemplo: 1
    static create = async (req: Request, res: Response) => {
        try {
//budgetId viene del modelo de Expense de la ForeignKey
// budgetId es la Foreign Key que relaciona Expense con Budget.
// Asignamos el ID del presupuesto(budget) "req.budget.id" que ya fue validado y recuperado en la DB a nuestro gasto(expenese) budgetId y asi relacionarlo  Y al final almacenamos en la DB
            const expense = new Expense(req.body)
            expense.budgetId = req.budget.id
            await expense.save()
            res.status(201).json('Gasto agregado correctamente')

        } catch (error) {
            res.status(500).json('No se creo Gasto')
        }

}

//Obtener los gastos que hemos agregado a un presupuesto, cuando visitemos la pagina de un "presupuesto" este ya se traera los gastos que pertenecen a este presupuesto, ya que si ingresamos solo por la ruta ej. "http://localhost:4000/api/budgets/1" solo nos muestra la información basica del presupuesto "id, name y amount"
    static getById = async (req: Request, res: Response) => {

    }

    static updateById = async (req: Request, res: Response) => {

    }

    static deleteById = async (req: Request, res: Response) => {

    }
}
