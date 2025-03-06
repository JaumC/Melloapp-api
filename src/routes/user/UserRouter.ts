import { Router } from 'express';

import { upload } from '../../middlewares/multer';

import { create_user } from '../../services/user/create_user';
import { update_user } from '../../services/user/update_user';
import { login_user } from '../../services/user/login_user';
import { read_user } from '../../services/user/read_user';
import { get_user_photo } from '../../services/user/get_user_photo';

const UserRouter = Router();

UserRouter.post('/create', upload.single('file'), create_user);
UserRouter.post('/login', login_user);
UserRouter.get('/read/:id', read_user);
UserRouter.get('/photo/:id', get_user_photo);
UserRouter.post('/update/:id', upload.single('file'), update_user);

export default UserRouter;