import { getCustomRepository } from 'typeorm';
import UserModel from '@modules/user/infra/typeorm/entities/user.entity';
import ApiError from '@domain/errors/api.error';
import UserRepository from '@modules/user/repositories/user.repository';

interface UserDto {
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async run(id: string,
    {
      name, email, password,
    }: UserDto): Promise<UserModel> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new ApiError('user not found.', 401);
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
