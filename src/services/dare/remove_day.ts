import { Request, Response } from "express";
import DayPoint from "../../models/DayPoint";

export const remove_day = async (req: Request, res: Response) => {
    try {
        const { userId, dareId, data } = req.body;

        const dayPoint: any = await DayPoint.findOne({ dare_id: dareId });
        if (!dayPoint) {
            res.status(404).json({ message: "Desafio não encontrado." });
            return 
        }

        const challengers = dayPoint.days.get(data) ?? [];

        const wasMarked = challengers.some((c: any) => c.user_id === userId);
        if (!wasMarked) {
            res.status(400).json({ message: "Esse dia não foi marcado por esse usuário." });
            return
        }

        const updatedChallengers = challengers.filter((c: any) => c.user_id !== userId);
        dayPoint.days.set(data, updatedChallengers);

        dayPoint.markModified("days");
        await dayPoint.save();

        res.status(200).json({
            message: "Dia desmarcado com sucesso.",
            dayPoint
        });
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};
