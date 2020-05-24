import { getCustomRepository } from 'typeorm';
import UserModel from '../../models/user/user.model';
import UserRepository from '../../repositories/user/user.repository';


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
      throw new Error('name already exists.');
    }

    const emailAlreadyExists = await userRepository.checkEmail(email);
    if (emailAlreadyExists) {
      throw new Error('email already exists.');
    }

    const user = userRepository.create({
      name, email, password,
    });

    await userRepository.save(user);


    return user;
  }
}


export default CreateUserService;
