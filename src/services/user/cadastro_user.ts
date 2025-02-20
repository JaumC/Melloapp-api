import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from 'bcryptjs';

export const cadastro_user = async (req: Request, res: Response) => {
    const { email, password, nick, name, profilePic } = req.body;
    
    
    if (!email || !password || !nick || !name || !profilePic) {
        res.status(400).json({ message: 'Campos faltando.' });
        return
    }
    
    if(await User.findOne({email})) {
        res.status(400).json({ message: 'Email já cadastrado.' });
        return
    }
    
    const salt = await bcrypt.genSalt();
    const pass_hashed = await bcrypt.hash(password, salt);
    
    console.log(email, pass_hashed, nick, name, profilePic);

    const new_user = await User.create({
        nickname: nick,
        name: name,
        email: email,
        password: pass_hashed,
        profilePic: profilePic,
    });

    if(!new_user) {
        res.status(500).json({ message: 'Erro ao criar usuário.' });
        return
    }

    res.status(201).json({ message: 'Usuário criado com sucesso.' });
}