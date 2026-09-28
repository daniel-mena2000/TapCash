import { Router } from "express";
import { body, param } from "express-validator";//te permite validar lo que se envia eb  el body como el JSON
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from "../middleware/budget";

const router = Router()

//Esto hara que es que si se utliza en alguna de las rutas el parametro de "budgetId" va a ejecutarse el middleware, y asi ahorrar lineas de codigo en cada ruta que necesite validar el id
router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExist)


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


export default router
