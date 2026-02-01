import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCategoryProject, deleteCategoryProject, getCategoryProject, updateCategoryProject } from "../controllers/categoryProject.js";
import logUserAction from "../middleware/logUserAction.js";

const CategoryProjectRouter = Router();
// auth,
CategoryProjectRouter.post('/',auth, logUserAction('Created a Category Project'),createCategoryProject);
CategoryProjectRouter.get('/', auth, logUserAction('Fetched Category Project'),getCategoryProject);
CategoryProjectRouter.patch('/:categoryProjectId', auth,logUserAction('Deleted a Category Project'),deleteCategoryProject);
CategoryProjectRouter.put('/:categoryProjectId', auth, logUserAction('Updated a Category Project'),updateCategoryProject);

export default CategoryProjectRouter;