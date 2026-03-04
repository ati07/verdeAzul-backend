import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCuenta, deleteCuenta, getCuenta, updateCuenta } from "../controllers/cuenta.js";
import logUserAction from "../middleware/logUserAction.js";

const CuentaRouter = Router();
// auth,
CuentaRouter.post('/', auth, logUserAction('Created a Cuenta'),createCuenta);
CuentaRouter.get('/', auth, logUserAction('Fetched Cuenta'),getCuenta);
CuentaRouter.patch('/:cuentaId', auth,logUserAction('Deleted a Cuenta'),deleteCuenta);
CuentaRouter.put('/:cuentaId', auth, logUserAction('Updated a Cuenta'),updateCuenta);

export default CuentaRouter;