import { Request, Response } from "express";
import User from "../../models/User";

export const cadastro_user = async (req: Request, res: Response) => {
    console.log('bateu aqui')
    const { email, password, nickname, name } = req.body;

    const user = await User.create({
        nickname,
        name, 
        email,
        password,
    });

    await user.save();

    res.status(201).json(user);
}