import UserDTO from "../dtos/UserDTO";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository';
import MailService from './MailService';

export default class UserService {

  public async createNewUser({ name, email, password }: UserDTO): Promise<UserDTO> {
    const userRepository = getCustomRepository(UserRepository);

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
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });
    await userRepository.save(user);

    try {
      const mailService = new MailService();
      await mailService.sendConfirmation(user);
    } catch(ex) { }

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}
