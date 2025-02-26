import { Router } from 'express';

import { create_user } from '../../services/user/create_user';
import { update_user } from '../../services/user/update_user';
import { login_user } from '../../services/user/login_user';
import { read_user } from '../../services/user/read_user';

const UserRouter = Router();

UserRouter.post('/create', create_user);
UserRouter.post('/login', login_user);
UserRouter.get('/read/:id', read_user);
UserRouter.post('/update/:id', update_user);

export default UserRouter;