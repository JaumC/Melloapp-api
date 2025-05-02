import { Request, Response } from "express";
import DayPoint from "../../models/DayPoint";

export const add_day = async (req: Request, res: Response) => {
    try {
        const { userId, dareId, data } = req.body;

        const dayPoint: any = await DayPoint.findOne({ dare_id: dareId });
        if (!dayPoint) {
            res.status(404).json({ message: "Desafio não encontrado." });
            return
        }

        const challengers = dayPoint.days.get(data);

        const alreadyMarked: boolean = challengers.some((c: { user_id: string }) =>
            c.user_id && c.user_id.toString() === userId.toString()
        );

        if(alreadyMarked){
            res.status(400).json({ message: "Dia já marcado."})
            return
        }

        challengers.push({
            user_id: userId,
            marked_at: new Date(),
            points: 1
        });
        
        dayPoint.days.set(data, challengers);
        dayPoint.markModified(`days.${data}`);
        await dayPoint.save();

        res.status(200).json({
            message: "Dia marcado com sucesso.",
            dayPoint,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};
