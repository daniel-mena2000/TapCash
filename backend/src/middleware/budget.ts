import { Request, Response, NextFunction } from 'express'
import { param, body, validationResult } from 'express-validator'
import Budget from "../models/Budget";

//run(req) es un método de express-validator que ejecuta manualmente una validación sobre una petición (req)
//Cuando quieres mover las validaciones a un middleware, ya no estás dentro de la definición de la ruta. Entonces necesitas decirle a express-validator: "Ejecuta esta validación sobre esta petición (req)."

//Lo que hacemos es extender la interfaz Request para que TypeScript sepa que ese objeto tendrá una propiedad budget.
//Y asi poder pasarla de middleware a controller y mandarla llamar en el controller, y lo ponemos opcinal ya que si no lo pedira obligatorio en todos los middlewares que tengamos un "request"
declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}


export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
     await param('budgetId').isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no valido').run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}


export const validateBudgetExist = async (req: Request, res: Response, next: NextFunction) => {
//findByPK: Encontrar por primarykey
    try {
        const {budgetId} = req.params
        const budget = await Budget.findByPk(Number(budgetId))

        if (!budget) {
           return res.status(404).json({
                error: "Presupuesto no encontrado"
            });
        }
        req.budget = budget
        next()

     } catch (error) {
        return res.status(500).json("Error al obtener el presupuesto")
     }
}

//Esta validacion podemos hacerla generica para usarla en expenses tambien pero si ha futuro BUDGET agrega un campo nuevo tendriamos que hacer muchos cambios

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name').notEmpty().withMessage('Ingresa un nombre para el presupuesto').run(req)
    await body('amount')
        .notEmpty().withMessage('La cantida del presupuesto no puede ir vacia')
        .isNumeric().withMessage('Cantidad no válida')
        .custom(value => value > 0).withMessage('El presupuesto debe ser mayor a 0').run(req)
    next()
}
