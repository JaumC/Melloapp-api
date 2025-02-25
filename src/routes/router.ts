import { Router } from 'express';
import UserRouter from './user/UserRouter';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});
router.use('/user', UserRouter);

export default router;