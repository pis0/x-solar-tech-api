import { getCustomRepository } from 'typeorm';
import UserModel from '../../models/user/user.model';
import UserRepository from '../../repositories/user/user.repository';


class ListUserService {
  public async run(): Promise<UserModel[]> {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    if (!users?.length) {
      throw new Error('no users.');
    }
    return users;
  }
}

export default ListUserService;
