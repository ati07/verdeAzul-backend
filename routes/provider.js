import { Router } from "express";
import auth from "../middleware/auth.js";
import { createProvider, deleteProvider, getProvider, updateProvider } from "../controllers/provider.js";
import logUserAction from "../middleware/logUserAction.js";

const ProviderRouter = Router();
// auth,
ProviderRouter.post('/', auth, logUserAction('Created a Provider'),createProvider);
ProviderRouter.get('/', auth, logUserAction('Fetched Provider'),getProvider);
ProviderRouter.patch('/:providerId', auth,logUserAction('Deleted a Provider'),deleteProvider);
ProviderRouter.put('/:providerId', auth, logUserAction('Updated a Provider'),updateProvider);

export default ProviderRouter;