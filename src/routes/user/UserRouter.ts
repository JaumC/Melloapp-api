import { Router } from 'express';

import { cadastro_user } from '../../services/user/cadastro_user';
import { login_user } from '../../services/user/login_user';

const UserRouter = Router();

UserRouter.post('/cadastro', cadastro_user);
UserRouter.post('/login', login_user);

export default UserRouter;