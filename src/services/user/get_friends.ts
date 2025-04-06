import { Request, Response } from "express";
import User from "../../models/User";

export const get_friends = async (req: Request, res: Response) => {
    const { id, search } = req.query;

    try {
        if (!id) {
            res.status(400).json({ message: "ID do usuário não fornecido." });
            return
        }

        const currentUser = await User.findById(id);
        if (!currentUser) {
            res.status(404).json({ message: "Usuário não encontrado." });
            return
        }

        let users = [];

        if (search && search !== '') {
            const searchQuery = {
                $or: [
                    { nickname: { $regex: search, $options: 'i' } },
                    { search_id: { $regex: search, $options: 'i' } }
                ]
            };

            users = await User.find({
                _id: { $in: currentUser.friends },
                ...searchQuery
            }).select('_id nickname search_id');
        } else {
            users = await User.find({
                _id: { $in: currentUser.friends }
            }).select('_id nickname search_id');
        }

        if (users.length === 0) {
            res.status(404).json({ message: 'Nenhum amigo encontrado.' });
            return
        }

        res.status(200).json({ message: 'Amigos encontrados com sucesso.', users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar amigos.' });
    }
};
