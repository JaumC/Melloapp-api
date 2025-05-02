import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import color_generate from "../../utils/color_generate"

export const create_user = async (req: Request, res: Response) => {
    const { email, password, nickname, name } = req.body;
    const file = req.file;

    if (!email || !password || !nickname || !name) {
        res.status(400).json({ message: 'Campos faltando.' });
        return;
    }

    if (await User.findOne({ email })) {
        res.status(400).json({ message: 'Email já cadastrado.' });
        return;
    }

    let color = await color_generate()

    while (await User.findOne({ color: color })) {
        color = await color_generate()
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
        color: color,
    });

    if (!new_user) {
        res.status(500).json({ message: 'Erro ao criar usuário.' });
        return;
    }

    res.status(201).json({ message: 'Usuário criado com sucesso.' });
}
