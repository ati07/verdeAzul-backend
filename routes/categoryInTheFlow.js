import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCategoryInTheFlow, deleteCategoryInTheFlow, getCategoryInTheFlow, updateCategoryInTheFlow } from "../controllers/categoryInTheFlow.js";
import logUserAction from "../middleware/logUserAction.js";

const CategoryInTheFlowRouter = Router();

CategoryInTheFlowRouter.post('/', auth, logUserAction('Created Category In The Flow'),createCategoryInTheFlow);
CategoryInTheFlowRouter.get('/', auth, logUserAction('Fetched Category In The Flow'),getCategoryInTheFlow);
CategoryInTheFlowRouter.patch('/:categoryInTheFlowId', auth,logUserAction('Deleted Category In The Flow'),deleteCategoryInTheFlow);
CategoryInTheFlowRouter.put('/:categoryInTheFlowId', auth, logUserAction('Updated Category In The Flow'),updateCategoryInTheFlow);

export default CategoryInTheFlowRouter;