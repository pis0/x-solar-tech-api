import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserModel from '@modules/user/infra/typeorm/entities/user.entity';
import UserRepository from '@modules/user/repositories/user.repository';
import ApiError from '@domain/errors/api.error';


interface UserDto {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async run({
    name, email, password,
  }: UserDto): Promise<UserModel> {
    const userRepository = getCustomRepository(UserRepository);

    const nameAlreadyExists = await userRepository.checkName(name);
    if (nameAlreadyExists) {
      throw new ApiError('name already exists.');
    }

    const emailAlreadyExists = await userRepository.checkEmail(email);
    if (emailAlreadyExists) {
      throw new ApiError('email already exists.');
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name, email, password: passwordHash,
    });

    await userRepository.save(user);

    return user;
  }
}


export default CreateUserService;
