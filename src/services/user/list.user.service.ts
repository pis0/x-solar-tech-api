import { getCustomRepository } from 'typeorm';
import UserModel from '../../models/user/user.model';
import UserRepository from '../../repositories/user/user.repository';
import ApiError from '../../errors/api.error';

class ListUserService {
  public async run(): Promise<UserModel[]> {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    if (!users?.length) {
      throw new ApiError('no users.', 401);
    }
    return users;
  }
}

export default ListUserService;
