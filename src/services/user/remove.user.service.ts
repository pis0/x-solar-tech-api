import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/user/user.repository';
import ApiError from '../../errors/api.error';

class RemoveUserService {
  public async run(id: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new ApiError('user not found.', 401);
    }

    await userRepository.remove(user);
  }
}

export default RemoveUserService;
