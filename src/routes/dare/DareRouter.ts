import { Router } from 'express';

import { create_dare } from '../../services/dare/create_dare';
import { get_dare } from '../../services/dare/get_dare';
import { add_day } from '../../services/dare/add_day';
import { remove_day } from '../../services/dare/remove_day';
import { update_dare } from '../../services/dare/update_dare';
import { get_challengers } from '../../services/dare/get_challengers';

const DareRouter = Router();

DareRouter.post('/create', create_dare);
DareRouter.get('/read/:id', get_dare);
DareRouter.get('/challengers', get_challengers);

DareRouter.patch('/addDay', add_day);
DareRouter.patch('/update', update_dare);
DareRouter.patch('/removeDay', remove_day);

export default DareRouter;