import { Request, Response } from "express";
import DayPoint from "../../models/DayPoint";
import Dare from "../../models/Dare";

export const add_day = async (req: Request, res: Response) => {
    try {
        const { userId, dareId, data } = req.body;

        const streakData = await Dare.findOne({ _id: dareId }).select('streak');
        const streak = streakData?.streak ?? 0;

        console.log(streak)

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
            points: 1 * Number(streak)
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
