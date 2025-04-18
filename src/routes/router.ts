import { Router } from 'express';
import UserRouter from './user/UserRouter';
import DareRouter from './dare/DareRouter';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});
router.use('/user', UserRouter);
router.use('/dare', DareRouter);

export default router;