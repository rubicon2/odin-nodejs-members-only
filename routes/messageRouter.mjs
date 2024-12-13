import * as messageController from '../controllers/messageController.mjs';
import { isAuth, isMember, isAdmin } from '../routes/auth.mjs';
import { Router } from 'express';

const appRouter = Router();

appRouter.get('/', messageController.getMessages);
appRouter.get('/new', isAuth, isMember, messageController.getNewMessage);
appRouter.post('/new', isAuth, isMember, messageController.postNewMessage);
appRouter.post('/delete', isAuth, isAdmin, messageController.deleteMessage);

export default appRouter;
