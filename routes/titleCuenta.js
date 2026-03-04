import { Router } from "express";
import auth from "../middleware/auth.js";
import { createTitleCuenta, deleteTitleCuenta, getTitleCuenta, updateTitleCuenta } from "../controllers/titleCuenta.js";
import logUserAction from "../middleware/logUserAction.js";

const TitleCuentaRouter = Router();
// auth,
TitleCuentaRouter.post('/', auth, logUserAction('Created a Title Cuenta'),createTitleCuenta);
TitleCuentaRouter.get('/', auth, logUserAction('Fetched Title Cuenta'),getTitleCuenta);
TitleCuentaRouter.patch('/:titleCuentaId', auth,logUserAction('Deleted a Title Cuenta'),deleteTitleCuenta);
TitleCuentaRouter.put('/:tTitleCuentaId', auth, logUserAction('Updated a Title Cuenta'),updateTitleCuenta);

export default TitleCuentaRouter;