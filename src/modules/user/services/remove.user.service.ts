import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import IUserRepository from '@modules/user/repositories/iuser.repository';

@injectable()
class RemoveUserService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
      userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }


  public async run(id: string): Promise<void> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new ApiError('user not found.', 401);
    }

    await this.userRepository.remove(user);
  }
}

export default RemoveUserService;
