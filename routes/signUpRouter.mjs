import { getSignUp, postSignUp } from '../controllers/signUpController.mjs';
import { validateSignUpData } from './validation.mjs';
import { Router } from 'express';

const router = Router();

router.get('/', getSignUp);
router.post('/', validateSignUpData, postSignUp);

export default router;
