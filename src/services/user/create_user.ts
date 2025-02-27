import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export const create_user = async (req: Request, res: Response) => {
    
    const { email, password, nickname, name } = req.body;
    const file = req.file;

    console.log(email)
    console.log(password)
    console.log(nickname)
    console.log(name)

    if (!email || !password || !nickname || !name) {
        res.status(400).json({ message: 'Campos faltando.' });
        return;
    }

    if (await User.findOne({ email })) {
        res.status(400).json({ message: 'Email já cadastrado.' });
        return;
    }

    const salt = await bcrypt.genSalt();
    const pass_hashed = await bcrypt.hash(password, salt);

    const search_id = uuidv4().slice(0, 8);

    const new_user = await User.create({
        nickname: nickname,
        name: name,
        email: email,
        password: pass_hashed,
        profilePic: file?.path,
        search_id: search_id,
    });

    if (!new_user) {
        res.status(500).json({ message: 'Erro ao criar usuário.' });
        return;
    }

    res.status(201).json({ message: 'Usuário criado com sucesso.' });
}
