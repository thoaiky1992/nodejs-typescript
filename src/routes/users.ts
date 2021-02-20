import { response, Router } from 'express';
import UserController from '../controllers/user.controler';
const router = Router();

router.get('/', UserController.getAll)

router.put('/', UserController.update)

export default router;