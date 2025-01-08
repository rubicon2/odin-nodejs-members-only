import * as logInController from '../controllers/logInController.mjs';
import storeFormData from '../middleware/storeFormData.mjs';
import storePassportErrors from '../middleware/storePassportErrors.mjs';
import clearRouteData from '../middleware/clearRouteData.mjs';
import { Router } from 'express';
import passport from 'passport';

const appRouter = Router();

appRouter.get(
  '/',
  storePassportErrors,
  logInController.getLogIn,
  clearRouteData,
);
appRouter.post(
  '/',
  storeFormData,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureMessage: true,
  }),
);

export default appRouter;
