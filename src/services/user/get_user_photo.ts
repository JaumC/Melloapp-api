import { Request, Response } from 'express';
import User from '../../models/User';
import fs from 'fs';

export const get_user_photo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id).select('profilePic');

    if(!user){
        res.status(404).json({ error: 'Usuário não encontrado.' });
        return
    }
    
    const imagePath = user.profilePic;
    
    if(!imagePath) {
        res.status(404).json({ error: 'Imagem do perfil não encontrada.' });
    }
    
    if (fs.existsSync(imagePath)){
        res.sendFile(imagePath)
    }else{
        res.status(404).json({ error: 'Imagem do perfil não encontrada.' })
    }
}