import { Request, Response } from "express";
import User from "../../models/User";

export const update_user = async (req: Request, res: Response) => {
    const { email, nickname, name, profilePic } = req.body;
    const { id } = req.params;
    
    if (!email || !nickname || !name || !profilePic || !id) {
        res.status(400).json({ message: 'Campos faltando.' });
        return
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
        res.status(400).json({ message: 'Email já cadastrado.' });
        return
    }
    
    const update_user = await User.updateOne({_id: id}, {
        nickname: nickname,
        name: name,
        email: email,
        profilePic: profilePic,
    });

    if(!update_user) {
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
        return
    }

    res.status(201).json({ message: 'Usuário atualizado com sucesso.' });
}