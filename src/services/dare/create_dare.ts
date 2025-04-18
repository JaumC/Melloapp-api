import { Request, Response } from "express";
import Dare from "../../models/Dare";

export const create_dare = async (req: Request, res: Response) => {
    const { name, startDate, endDate, days, weekend, friends, sequencyDay, sequencyMounth, streak, host } = req.body;

    if (!name || !startDate || !host || !endDate || !days || !friends || !sequencyDay || !sequencyMounth || !streak) {
        res.status(400).json({ message: 'Campos faltando.' });
        return;
    }

    const new_dare = await Dare.create({
        name: name,
        start_date: startDate,
        end_date: endDate,
        streak: streak,
        days: days,
        weekend: weekend,
        challengers: friends,
        host: host,
        day_sequency: sequencyDay,
        mounth_sequency: sequencyMounth,

    });

    if (!new_dare) {
        res.status(500).json({ message: 'Erro ao criar desafio.' });
        return;
    }

    res.status(201).json({ message: 'Desafio criado com sucesso.' });
}
