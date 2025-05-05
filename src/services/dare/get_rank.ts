import { Request, Response } from "express";
import Dare from "../../models/Dare";
import User from "../../models/User";
import DayPoint from "../../models/DayPoint";

export const get_rank = async (req: Request, res: Response) => {
    const { id } = req.query;

    try {
        const dare = await Dare.findOne({ _id: id });

        if (!dare) {
            res.status(404).json({ message: "Desafio não encontrado." })
        }

        const users = await User.find({
            $or: [
                { _id: { $in: dare?.challengers || [] } },
                { _id: dare?.host },
            ]
        }).select('nickname color profilePic');

        const dayPoints = await DayPoint.findOne({ dare_id: id })

        const userPoints: Record<string, number> = {};
        for (const user of users) {
            userPoints[user._id.toString()] = 0;
        }

        if (dayPoints && dayPoints.days) {
            for (const [date, markings] of dayPoints?.days.entries()) {
                for (const marking of markings) {
                    const userId = marking.user_id;
                    const points = marking.points;

                    if (!userPoints[userId]) {
                        userPoints[userId] = 0;
                    }

                    userPoints[userId] += points;
                }
            }
        }

        const ranking = Object.entries(userPoints)
            .sort(([, aPoints], [, bPoints]) => bPoints - aPoints)
            .map(([userId, points], index) => {
                const user = users.find(u => u._id.toString() === userId)
                return {
                    userId,
                    nickname: user?.nickname || '',
                    color: user?.color || '',
                    profilePic: user?.profilePic || '',
                    position: index + 1,
                    points
                }
            });

        res.status(200).json({ ranking });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao calcular ranking.' });
    }
};
