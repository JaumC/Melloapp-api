import { Router } from 'express';

import { create_dare } from '../../services/dare/create_dare';

const DareRouter = Router();

DareRouter.post('/create', create_dare);

export default DareRouter;