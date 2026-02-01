import { Router } from "express";
import auth from "../../middleware/auth.js";
import { createCategoryWorkProgress, deleteCategoryWorkProgress, getCategoryWorkProgress, updateCategoryWorkProgress } from "../../controllers/workProgress/category.js";
import logUserAction from "../../middleware/logUserAction.js";

const categoryWorkProgressRouter = Router();
// auth,
categoryWorkProgressRouter.post('/',auth, logUserAction('Created a Category of Work Progress'),createCategoryWorkProgress);
categoryWorkProgressRouter.get('/', auth, logUserAction('Fetched Category of Work Progress'),getCategoryWorkProgress);
categoryWorkProgressRouter.patch('/:CategoryWorkProgressId', auth,logUserAction('Deleted a Category of Work Progress'),deleteCategoryWorkProgress);
categoryWorkProgressRouter.put('/:CategoryWorkProgressId', auth, logUserAction('Updated a Category of Work Progress'),updateCategoryWorkProgress);

export default categoryWorkProgressRouter;