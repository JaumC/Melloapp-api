import { Router } from 'express';

import { upload } from '../../middlewares/multer';

import { create_user } from '../../services/user/create_user';
import { get_all_users } from '../../services/user/get_all_users';
import { update_user } from '../../services/user/update_user';
import { login_user } from '../../services/user/login_user';
import { recover_user } from '../../services/user/recover_user';
import { get_user_photo } from '../../services/user/get_user_photo';
import { follow_user } from '../../services/user/follow_user';
import { unfollow_user } from '../../services/user/unfollow_user';
import { get_friends } from '../../services/user/get_friends';

const UserRouter = Router();

UserRouter.post('/create', upload.single('file'), create_user);
UserRouter.post('/login', login_user);
UserRouter.post('/recover', recover_user);

UserRouter.get('/readall', get_all_users);
UserRouter.get('/readfriends', get_friends);
UserRouter.get('/photo/:id', get_user_photo);

UserRouter.patch('/update/:id', upload.single('file'), update_user);
UserRouter.patch('/follow/:id', follow_user);
UserRouter.patch('/unfollow/:id', unfollow_user);

export default UserRouter;