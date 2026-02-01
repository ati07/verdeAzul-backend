import { Router } from 'express';

import { createClient, deleteClient, getClient, updateClient } from '../controllers/client.js';
import auth from '../middleware/auth.js';
import authenticateRoles from '../middleware/authenticateRole.js';
import logUserAction from '../middleware/logUserAction.js';

const allowedRoles = ["Admin", "Super Admin","Partner", "CRM_Admin"]

const clientRouter = Router();
// auth, authenticateRoles(allowedRoles),
clientRouter.post('/', auth, logUserAction('Created a Client'),createClient);
clientRouter.get('/', auth, logUserAction('Feteched Clients'),getClient);
clientRouter.patch('/:clientId', auth, logUserAction('Deleted a Client'),deleteClient);
clientRouter.put('/:clientId', auth, logUserAction('Updated a Client'),updateClient);

export default clientRouter;