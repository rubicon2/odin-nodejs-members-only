import { getSignUp, postSignUp } from '../controllers/signUpController.mjs';
import clearRouteData from '../middleware/clearRouteData.mjs';
import { validateSignUpData } from './validation.mjs';
import storeFormData from '../middleware/storeFormData.mjs';
import storeValidationErrors from '../middleware/storeValidationErrors.mjs';

import { Router } from 'express';

const router = Router();

router.get('/', getSignUp, clearRouteData);
router.post(
  '/',
  validateSignUpData,
  storeFormData,
  storeValidationErrors,
  postSignUp,
);

export default router;
