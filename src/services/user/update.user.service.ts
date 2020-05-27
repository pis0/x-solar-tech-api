import { getCustomRepository } from 'typeorm';
import UserModel from '../../models/user/user.model';
import UserRepository from '../../repositories/user/user.repository';
import ApiError from '../../errors/api.error';

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
