import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import IUserRepository from '@modules/user/repositories/iuser.repository';

@injectable()
class ListUserService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
      userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }


  public async run(id: string | null): Promise<any[]> {
    const users = id
      ? [await this.userRepository.findUserById(id)]
      : await this.userRepository.find();
    if (!users?.length) {
      throw new ApiError('no users.', 401);
    }
    return users;
  }
}

export default ListUserService;
