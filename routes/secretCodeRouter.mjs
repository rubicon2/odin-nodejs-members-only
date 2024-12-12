import * as secretCodeController from '../controllers/secretCodeController.mjs';
import { Router } from 'express';

const appRouter = Router();

appRouter.get('/', secretCodeController.getSecretCodeSelect);
appRouter.get('/member', secretCodeController.getMemberCodeForm);
appRouter.get('/admin', secretCodeController.getAdminCodeForm);
appRouter.get('/success', secretCodeController.getSuccess);
appRouter.post('/member', secretCodeController.postMemberCodeForm);
appRouter.post('/admin', secretCodeController.postAdminCodeForm);

export default appRouter;
