import { Request, Response } from "express";
import Dare from "../../models/Dare";
import User from "../../models/User";

export const get_dare = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: 'ID faltando.' });
        return;
    }

    const user = await User.findById({ _id: id })

    if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' })
        return;
    }
    const dare = await Dare.find({
        $or: [
            { host: user._id },
            { challengers: user._id },
        ]
    })

    if (!dare) {
        res.status(404).json({ message: 'Desafio não encnontrado.' })
        return;
    }
    res.status(200).json({ dare });
}