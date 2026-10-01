import type { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

//En este caso se usaran clases, si colocalos static no es necesario instanciar

//TRAERNOS TODOS LOS PRESUPUESTOS
export class BudgetController {
    static getall = async (req: Request, res: Response) => {
//findAll dentro del objeto posemos pasarle propiedades adicionales a la consulta como un limite, ordenar etc.
//En este caso ordenaremos por fecha de forma DESENDENTE y asi muestre los mas nuevos
        const budgets = await Budget.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        res.json(budgets)
    }

//CREAR PRESUPUESTO
    static create = async (req: Request, res: Response) => {
        try {
//Mandamos llamar el modelo de "Budget"
            const budget = new Budget(req.body)
            await budget.save()

            res.status(201).json('Presupuesto creado correctamente')

        } catch (error) {
            res.status(500).json('No se creo Presupuesto')
        }
    }

//OBTENER UN BUDGET POR SU ID.
//En este caso si queremos mandar llamar el gasto solo usamos: res.json(req.budget) y ya
//Pero en este caso queremos incluir tambien los gastos que pertenecen a ese presupuesto a si que lo modificamos un poco

    static getById = async (req: Request, res: Response) => {
//Para traernos la relacion con expense dependiendo el ID, le indicamos que incluya la relacion de "Expense" y ya solo mandamos llamar "budget"
        const budget = await Budget.findByPk(req.budget.id, {
            include: [Expense]
        })
        res.json(budget)
    }


//ACTUALIZAR UN BUDGET POR SU ID
//destroy() y update() son operaciones asíncronas, igual que findByPk(). Todas realizan consultas a la base de datos. por eso necesitan await
     static updateById = async (req: Request, res: Response) => {
        try {
            await req.budget.update(req.body);

            res.json("Presupuesto actualizado correctamente");
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el presupuesto"
        });
    }
}


//ELIMINAR UN BUDGET POR SU ID
     static deleteById = async (req: Request, res: Response) => {
       try {
        await req.budget.destroy();

        res.json("Presupuesto eliminado correctamente");
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el presupuesto"
        });
    }
    }
}
