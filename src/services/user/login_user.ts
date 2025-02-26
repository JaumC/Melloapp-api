import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login_user = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    res.status(400).json({ message: 'Campos faltando.' });
    return
  }

  const user = await User.findOne({email})

  if(!user) {
    res.status(400).json({ message: 'Email não cadastrado.' });
    return
  }

  const compare_pass = await bcrypt.compare(password, user.password);

  if(!compare_pass) {
      res.status(400).json({ message: 'Senha incorreta!' });
      return;
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET as string, {
    expiresIn: '2d'
  });

  res.status(200).json({ 
    message: 'Login efetuado com sucesso!', 
    token: token, 
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      profilePic: user.profilePic,

    } 
  });
}