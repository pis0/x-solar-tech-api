import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import IUserRepository from '@modules/user/repositories/iuser.repository';
import ApiError from '@domain/errors/api.error';
import IUserDto from '@modules/user/dto/iuser.dto';

@injectable()
class CreateUserService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
      userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async run({
    name, email, password,
  }: IUserDto): Promise<any> {
    const nameAlreadyExists = await this.userRepository.checkName(name);
    if (nameAlreadyExists) {
      throw new ApiError('name already exists.');
    }

    const emailAlreadyExists = await this.userRepository.checkEmail(email);
    if (emailAlreadyExists) {
      throw new ApiError('email already exists.');
    }

    const passwordHash = await hash(password, 8);

    const user = this.userRepository.create({
      name, email, password: passwordHash,
    });

    return user;
  }
}


export default CreateUserService;
