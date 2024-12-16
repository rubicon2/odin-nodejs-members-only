import { isAuth, isAdmin } from '../routes/auth.mjs';
import * as adminController from '../controllers/adminController.mjs';
import { Router } from 'express';

const appRouter = Router();

appRouter.get('/', isAuth, isAdmin, adminController.getUserList);
appRouter.post('/remove-member', isAuth, isAdmin, adminController.removeMember);
appRouter.post('/remove-admin', isAuth, isAdmin, adminController.removeAdmin);
appRouter.post('/delete-user', isAuth, isAdmin, adminController.deleteUser);

export default appRouter;
