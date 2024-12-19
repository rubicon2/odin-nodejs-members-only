import * as secretCodeController from '../controllers/secretCodeController.mjs';
import { isAuth } from './auth.mjs';
import storeFormData from '../middleware/storeFormData.mjs';
import clearRouteData from '../middleware/clearRouteData.mjs';
import { Router } from 'express';

const appRouter = Router();

appRouter.get('/', isAuth, secretCodeController.getSecretCodeSelect);
appRouter.get(
  '/member',
  isAuth,
  secretCodeController.getMemberCodeForm,
  clearRouteData,
);
appRouter.get(
  '/admin',
  isAuth,
  secretCodeController.getAdminCodeForm,
  clearRouteData,
);
appRouter.get(
  '/success',
  isAuth,
  secretCodeController.getSuccess,
  clearRouteData,
);
appRouter.post(
  '/member',
  isAuth,
  storeFormData,
  secretCodeController.postMemberCodeForm,
);
appRouter.post(
  '/admin',
  isAuth,
  storeFormData,
  secretCodeController.postAdminCodeForm,
);

export default appRouter;
