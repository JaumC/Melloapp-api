import { Request, Response } from "express";
import Dare from "../../models/Dare";
import User from "../../models/User";
import DayPoint from "../../models/DayPoint";
import { Types } from "mongoose";

export const get_dare = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { dareId } = req.query;

    if (!id) {
        res.status(400).json({ message: 'ID faltando.' });
        return;
    }

    const user = await User.findById({ _id: id });

    if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
    }

    let dareList: any[] = [];

    if (!dareId) {
        dareList = await Dare.find({
            $or: [
                { host: user._id },
                { challengers: user._id },
            ]
        });
    } else {
        const dare = await Dare.findOne({ _id: dareId });
        if (!dare) {
            res.status(404).json({ message: 'Desafio não encontrado.' });
            return;
        }
        dareList = [dare];
    }

    const dareIds = dareList.map((d) => d._id);

    const dayPoint = await DayPoint.find({ dare_id: { $in: dareIds } });

    res.status(200).json({ dare: dareList, dayPoint });
};
