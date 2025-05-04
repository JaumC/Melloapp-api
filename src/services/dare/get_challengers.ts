import { Request, Response } from "express";
import User from "../../models/User";

export const get_challengers = async (req: Request, res: Response) => {
    let { ids } = req.query;

    if (typeof ids === 'string') {
        ids = ids.split(',');
    }
    
    try {
        if (!ids || !Array.isArray(ids)) {
            res.status(400).json({ message: "IDs de amigos não fornecidos ou inválidos." });
            return;
        }

        const friends = await User.find({
            _id: { $in: ids }
        }).select('_id nickname search_id');

        if (friends.length === 0) {
            res.status(404).json({ message: 'Nenhum amigo encontrado.' });
            return;
        }

        res.status(200).json({ message: 'Amigos encontrados com sucesso.', users: friends });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar amigos.' });
    }
};
