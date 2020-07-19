import UserDTO from "../dtos/UserDTO";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import AppError from "../errors/AppError";
import { compare } from "bcryptjs";
import authConfig from '../config/authConfig';
import { sign } from "jsonwebtoken";

export default class SessionsService {

  public async authenticateUser(email: string, password: string):
    Promise<{ user: UserDTO, token: string }> {

    const userRepository = getCustomRepository(UserRepository);

    if (!email || !password) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const userFound = await userRepository.findOne({ where: { email } });

    if (!userFound) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await compare(password, userFound.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userFound.id,
      expiresIn: expiresIn
    });

    const user: UserDTO = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    }

    return { user, token };
  }
}
