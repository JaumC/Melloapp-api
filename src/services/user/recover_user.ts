import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export const recover_user = async (req: Request, res: Response) => {

    const { email, confirmarSenha } = req.body;

    if (!email || !confirmarSenha) {
        res.status(400).json({ message: "E-mail e nova senha são obrigatórios." });
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado." });
            return;
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(confirmarSenha, salt);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Senha redefinida com sucesso." });
    } catch (error) {
        console.error("Erro ao redefinir senha:", error);
        res.status(500).json({ message: "Erro ao redefinir senha." });
    }
};
