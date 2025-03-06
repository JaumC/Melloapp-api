import { Request, Response } from "express";
import User from "../../models/User";

export const update_user = async (req: Request, res: Response) => {
    const { email, nickname, name, id } = req.body;
    console.log('id', id)
    
    const file = req.file;
    
    if (!email || !nickname || !name || !id) {
        res.status(400).json({ message: 'Campos faltando.' });
        return
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
        res.status(400).json({ message: 'Email já cadastrado.' });
        return
    }

    console.log('email', email)
    console.log('nick', nickname)
    console.log('file', file)
    
    const update_user = await User.findByIdAndUpdate(id, {
    
        nickname: nickname,
        name: name,
        email: email,
        profilePic: file?.path,
    })

    if(!update_user) {
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
        return
    }

    res.status(201).json({ message: 'Usuário atualizado com sucesso.' });
}