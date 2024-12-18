import { getSignUp, postSignUp } from '../controllers/signUpController.mjs';
import clearRouteData from '../middleware/clearRouteData.mjs';
import { validateSignUpData } from './validation.mjs';

import { Router } from 'express';

const router = Router();

router.get('/', getSignUp, clearRouteData);
router.post('/', validateSignUpData, postSignUp);

export default router;
