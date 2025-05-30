import { Request, Response } from "express";
import User from "../../models/User";

export const follow_user = async (req: Request, res: Response) => {
    const { friendId } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return
    }

    if (friendId && friendId !== "" && !user.friends.includes(friendId)) {
        user.friends.push(friendId);
    } else {
        res.status(400).json({ message: "Amigo já adicionado ou ID inválido" });
        return
    }

    await user.save();

    res.status(200).json({
        message: "Amigo adicionado com sucesso.",
        user: {
            id: user._id,
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            profilePic: user.profilePic,
            search_id: user.search_id,
            competition: user.competition,
            tot_score: user.tot_score,
            friends: user.friends,
        },
    });
};
