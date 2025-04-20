import { Request, Response } from "express";
import User from "../../models/User";

export const update_user = async (req: Request, res: Response) => {
    const { email, nickname, name, color } = req.body;
    const { id } = req.params;

    const user = await User.findById(id)
    if (!user){
        res.status(404).json({message: 'Usuário não encontrado'})
        return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
        res.status(400).json({ message: 'Email já cadastrado.' });
        return
    }
    
    if(name || name !== '') {
        user.name = name;
    }

    if(email || email !== '') {
        user.email = email;
    }

    if(color || color !== '') {
        user.color = color;
    }

    if(nickname || nickname !== '') {
        user.nickname = nickname;
    }

    if(req.file && req.file.path) {
        user.profilePic = req.file.path;
    }

    await user.save()

    res.status(200).json({ message: 'Usuário atualizado com sucesso.',
        user: {
            id: user._id,
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            profilePic: user.profilePic,
            search_id: user.search_id,
            competition: user.competition,
            tot_score: user.tot_score,
            color: user.color,
        }
     });
}