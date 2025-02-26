import { Request, Response} from 'express';
import User from '../../models/User';

export const read_user = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id).select('name email nickname profilePic tot_score competition search_id')

    if(!user){
        res.status(404).json({ error: 'Usuário não encontrado'})
        return
    }

    res.json(user)
    return
}