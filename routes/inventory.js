import { Router } from "express";
import auth from "../middleware/auth.js";
import { createInventory, deleteInventory, getInventory, updateInventory } from "../controllers/inventory.js";
import logUserAction from "../middleware/logUserAction.js";

const inventoryRouter = Router();
// auth,
inventoryRouter.post('/', auth, logUserAction('Created a Inventory'),createInventory);
inventoryRouter.get('/', auth, logUserAction('Fetched Inventory'),getInventory);
inventoryRouter.patch('/:inventoryId', auth,logUserAction('Deleted a Inventory'),deleteInventory);
inventoryRouter.put('/:inventoryId', auth, logUserAction('Updated a Inventory'),updateInventory);

export default inventoryRouter;
