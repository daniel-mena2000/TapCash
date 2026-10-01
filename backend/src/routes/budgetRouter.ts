import { Router } from "express";
import { body, param } from "express-validator";//te permite validar lo que se envia eb  el body como el JSON
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from "../middleware/budget";
import { ExpensesController } from "../controllers/ExpensesController";
import { validateExpenseId, validateExpenseInput } from "../middleware/expense";

const router = Router()

//Esto hara que es que si se utliza en alguna de las rutas el parametro de "budgetId" va a ejecutarse el middleware, y asi ahorrar lineas de codigo en cada ruta que necesite validar el id
router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExist)
//Validando expenseId
router.param('expenseId', validateExpenseId)

//TRAERNOS TODOS LOS PRESUPUESTOS
router.get('/', BudgetController.getall)

//CREAR PRESUPUESTO
router.post('/',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create)


//OBTENER UN BUDGET POR SU ID
router.get('/:budgetId',
    handleInputErrors,
    BudgetController.getById
)


//ACTUALIZAR UN BUDGET POR SU ID
router.put('/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateById)


//ELIMINAR UN BUDGET POR SU ID
router.delete('/:budgetId',
   handleInputErrors,
   BudgetController.deleteById)

   //api/budgets/10/expenses <- Esta sera la ruta de expenses ya que tiene que saber a que id de budget(presupuesto) se tiene que agregar el expense(gasto) y como ya estamos en la ruta de budget ya nos ahorramos el validar el formato con validateBudgetId y validateBudgetExists esto se le conoce como un patron ROA(Arquitectura basada en recursos)

router.post('/:budgetId/expenses',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.create )
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById )
router.put('/:budgetId/expenses/:expenseId', ExpensesController.updateById )
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById )


export default router
