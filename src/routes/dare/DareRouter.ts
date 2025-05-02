import { Router } from 'express';

import { create_dare } from '../../services/dare/create_dare';
import { get_dare } from '../../services/dare/get_dare';
import { add_day } from '../../services/dare/add_day';
import { remove_day } from '../../services/dare/remove_day';

const DareRouter = Router();

DareRouter.post('/create', create_dare);
DareRouter.get('/read/:id', get_dare);

DareRouter.patch('/addDay', add_day);
DareRouter.patch('/removeDay', remove_day);

export default DareRouter;