import { Router } from 'express';

import { create_dare } from '../../services/dare/create_dare';
import { get_dare } from '../../services/dare/get_dare';

const DareRouter = Router();

DareRouter.post('/create', create_dare);
DareRouter.get('/read/:id', get_dare);

export default DareRouter;