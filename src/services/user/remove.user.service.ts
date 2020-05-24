import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/user/user.repository';

class RemoveUserService {
  public async run(id: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new Error('user not found.');
    }

    await userRepository.remove(user);
  }
}

export default RemoveUserService;
