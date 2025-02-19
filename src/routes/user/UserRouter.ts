import { Router } from 'express';

import { cadastro_user } from '../../services/user/cadastro_user';
import { login_user } from '../../services/user/log_user';
import { logout_user } from '../../services/user/log_user';

const UserRouter = Router();

UserRouter.post('/cadastro', cadastro_user);
UserRouter.post('/login', login_user);
UserRouter.post('/logout', logout_user);

export default UserRouter;