import { Router } from 'express';

import { upload } from '../../middlewares/multer';

import { create_user } from '../../services/user/create_user';
import { get_all_users } from '../../services/user/get_all_users';
import { update_user } from '../../services/user/update_user';
import { login_user } from '../../services/user/login_user';
import { get_user_photo } from '../../services/user/get_user_photo';

const UserRouter = Router();

UserRouter.post('/create', upload.single('file'), create_user);
UserRouter.get('/readall', get_all_users);
UserRouter.post('/login', login_user);
UserRouter.get('/photo/:id', get_user_photo);
UserRouter.patch('/update/:id', upload.single('file'), update_user);

export default UserRouter;