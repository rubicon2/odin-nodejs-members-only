import * as messageController from '../controllers/messageController.mjs';
import { isAuth, isMember, isAdmin } from '../routes/auth.mjs';
import { validateMessageData } from './validation.mjs';
import storeFormData from '../middleware/storeFormData.mjs';
import clearRouteData from '../middleware/clearRouteData.mjs';
import storeValidationErrors from '../middleware/storeValidationErrors.mjs';
import { Router } from 'express';

const appRouter = Router();

appRouter.get('/', messageController.getMessages);
appRouter.get(
  '/new',
  isAuth,
  isMember,
  messageController.getNewMessage,
  clearRouteData,
);
appRouter.post(
  '/new',
  isAuth,
  isMember,
  validateMessageData,
  storeFormData,
  storeValidationErrors,
  messageController.postNewMessage,
);
appRouter.post('/delete', isAuth, isAdmin, messageController.deleteMessage);

export default appRouter;
