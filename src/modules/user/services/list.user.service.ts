import { getCustomRepository } from 'typeorm';
import UserModel from '@modules/user/infra/typeorm/entities/user.entity';
import UserRepository from '@modules/user/repositories/user.repository';
import ApiError from '@domain/errors/api.error';

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
