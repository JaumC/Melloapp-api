import { Request, Response } from "express";
import Dare from "../../models/Dare";
import DayPoint from "../../models/DayPoint";
import moment from 'moment';

export const create_dare = async (req: Request, res: Response) => {
    const { name, start_date, end_date, days, weekend, challengers, day_sequency, mounth_sequency, streak, host } = req.body;

    if (!name || !start_date || !host || !end_date || !days || !challengers || !day_sequency || !mounth_sequency || !streak) {
        res.status(400).json({ message: 'Campos faltando.' });
        return;
    }

    try {
        const new_dare = await Dare.create({
            name,
            start_date: start_date,
            end_date: end_date,
            streak,
            days,
            weekend,
            challengers: challengers,
            host,
            day_sequency: day_sequency,
            mounth_sequency: mounth_sequency,
        });

        // Gerar o objeto "days"
        const daysMap: Record<string, any[]> = {};
        let current = moment(start_date, "DD/MM/YYYY");
        const end = moment(end_date, "DD/MM/YYYY");

        while (current.isSameOrBefore(end)) {
            const dayOfWeek = current.isoWeekday();
            if (weekend || (dayOfWeek >= 1 && dayOfWeek <= 5)) {
                const dateStr = current.format("YYYY-MM-DD");
                daysMap[dateStr] = []; // Array vazio de challengers
            }
            current.add(1, 'day');
        }

        await DayPoint.create({
            dare_id: new_dare._id,
            days: daysMap
        });

        res.status(201).json({ message: 'Desafio criado com sucesso.' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar desafio.' });
    }
};