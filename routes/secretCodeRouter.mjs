import * as secretCodeController from '../controllers/secretCodeController.mjs';
import { isAuth } from './auth.mjs';
import { Router } from 'express';

const appRouter = Router();

appRouter.get('/', isAuth, secretCodeController.getSecretCodeSelect);
appRouter.get('/member', isAuth, secretCodeController.getMemberCodeForm);
appRouter.get('/admin', isAuth, secretCodeController.getAdminCodeForm);
appRouter.get('/success', isAuth, secretCodeController.getSuccess);
appRouter.post('/member', isAuth, secretCodeController.postMemberCodeForm);
appRouter.post('/admin', isAuth, secretCodeController.postAdminCodeForm);

export default appRouter;
