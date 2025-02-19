import { Request, Response } from "express";
import User from "../../models/User";

export const login_user = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = new User({
    email,
    password,
  });

  await user.save();

  res.status(201).json(user);
}

export const logout_user = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    const user = new User({
      email,
      password,
    });
  
    await user.save();
  
    res.status(201).json(user);
  }