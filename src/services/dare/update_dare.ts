import { Request, Response } from "express";
import Dare from "../../models/Dare";
import DayPoint from "../../models/DayPoint";
import moment from 'moment';
import mongoose from 'mongoose';

export const update_dare = async (req: Request, res: Response) => {
    const {
        name, start_date, end_date, days, weekend,
        challengers, day_sequency, mounth_sequency, streak
    } = req.body;
    const { dareId } = req.query;

    try {
        const dare = await Dare.findById(dareId);
        if (!dare) {
            res.status(404).json({ message: 'Desafio não encontrado.' });
            return;
        }

        const newRangeDate = dare.start_date === start_date && dare.end_date === end_date;

        const updateFields: any = {};
        if (!newRangeDate) {
            if (start_date) updateFields.start_date = start_date;
            if (end_date) updateFields.end_date = end_date;
        }
        if (name) updateFields.name = name;
        if (days) updateFields.days = days;
        if (typeof weekend === 'boolean') updateFields.weekend = weekend;
        if (challengers) updateFields.challengers = challengers;
        if (day_sequency) updateFields.day_sequency = day_sequency;
        if (mounth_sequency) updateFields.mounth_sequency = mounth_sequency;
        if (typeof streak === 'number') updateFields.streak = streak;

        await Dare.findByIdAndUpdate(dareId, updateFields);

        if (!newRangeDate) {
            await DayPoint.deleteMany({ dare_id: new mongoose.Types.ObjectId(dareId as string) });

            const daysMap = new Map<string, any[]>();
            let current = moment(start_date, "DD/MM/YYYY");
            const end = moment(end_date, "DD/MM/YYYY");

            while (current.isSameOrBefore(end)) {
                const dayOfWeek = current.isoWeekday();
                if (weekend || (dayOfWeek >= 1 && dayOfWeek <= 5)) {
                    const dateStr = current.format("YYYY-MM-DD");
                    daysMap.set(dateStr, []);
                }
                current.add(1, 'day');
            }

            await DayPoint.create({
                dare_id: dare._id,
                days: daysMap
            });
        }

        res.status(200).json({ message: 'Desafio atualizado com sucesso.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar desafio.' });
    }
};
