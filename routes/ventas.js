import { Router } from "express";
import auth from "../middleware/auth.js";
import { createVentas, deleteVentas, getVentas, updateVentas } from "../controllers/ventas.js";
import logUserAction from "../middleware/logUserAction.js";

const VentasRouter = Router();

VentasRouter.post('/', auth, logUserAction('Created a Ventas'),createVentas);
VentasRouter.get('/', auth, logUserAction('Fetched Ventas'),getVentas);
VentasRouter.patch('/:ventasId', auth,logUserAction('Deleted a Ventas'),deleteVentas);
VentasRouter.put('/:ventasId', auth, logUserAction('Updated a Ventas'),updateVentas);

export default VentasRouter;