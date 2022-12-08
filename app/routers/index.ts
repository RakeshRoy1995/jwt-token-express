import { Router } from 'express';
import {
  passwordLogin,
} from '../controllers/user.controller';
import validateRequest from '../middlewares/error.validation';
import { loginSchema } from '../validators/product.validator';


const router = Router();

router.post('/login', loginSchema, validateRequest,passwordLogin); 

export default router;
