import { injectable, inject } from 'tsyringe';
import ApiError from '@domain/errors/api.error';
import IUserDto from '@modules/user/dto/iuser.dto';
import IUserRepository from '@modules/user/repositories/iuser.repository';

@injectable()
class UpdateUserService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
      userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async run(id: string,
    {
      name, email, password,
    }: IUserDto): Promise<any> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new ApiError('user not found.', 401);
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    // await this.userRepository.save(user);
    // return user;
    return this.userRepository.save(user);
  }
}

export default UpdateUserService;
