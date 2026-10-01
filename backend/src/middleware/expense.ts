import { Request, Response, NextFunction } from 'express'
import { param, body, validationResult } from 'express-validator'


export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name').notEmpty().withMessage('Ingresa un nombre para el gasto').run(req)
    await body('amount')
        .notEmpty().withMessage('La cantida del gasto no puede ir vacia')
        .isNumeric().withMessage('Cantidad no válida del gasto')
        .custom(value => value > 0).withMessage('El gasto debe ser mayor a 0').run(req)
    next()
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
    await param('expenseId').isInt().custom(value => value > 0)
    .withMessage('ID no valida').run(req)

    let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
    next()
}
