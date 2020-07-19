import UserDTO from "../dtos/UserDTO";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository'

export default class UserService {

  public async createNewUser({ name, email, password }: UserDTO): Promise<UserDTO> {
    let userRepository = null;
    try {
      userRepository = getCustomRepository(UserRepository);
    } catch (ex) {
      console.log(ex);
    }

    if (!name) {
      throw new AppError('Name not found.');
    }

    if (!email) {
      throw new AppError('Email not found.');
    }

    if (!password) {
      throw new AppError('Password not found.');
    }

    const checkEmailExist = await userRepository.findOne({ where: { email } });
    if (checkEmailExist) {
      throw new AppError('Email addresss already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({ name, email, password });
    await userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}
