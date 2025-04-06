import { Request, Response } from "express";
import User from "../../models/User";

export const get_all_users = async (req: Request, res: Response) => {
    const { id, search } = req.query; 
  
    try {
      const searchQuery = search 
        ? { 
            $or: [
              { nickname: { $regex: search, $options: 'i' } }, 
              { search_id: { $regex: search, $options: 'i' } } 
            ] 
          } 
        : {}; 
  
      const users = await User.find({
        _id: { $ne: id },  
        ...searchQuery  
      }).select('_id nickname search_id');
  
      if (users.length === 0) {
        res.status(404).json({ message: 'Nenhum usuário encontrado.' });
        return;
      }

      res.status(200).json({ message: 'Usuários encontrados com sucesso.', users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
};
