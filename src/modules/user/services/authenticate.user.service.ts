import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AuthConfig from '@config/auth.config';
import ApiError from '@domain/errors/api.error';
import IUserDto from '@modules/user/dto/iuser.dto';
import IUserRepository from '@modules/user/repositories/iuser.repository';
import IResponseDto from '@modules/user/dto/iresponse.dto';


@injectable()
class AuthenticateUserService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
      userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }


  public async run({
    email, password,
  }: IUserDto): Promise<IResponseDto> {
    const errorMessage = 'email or password invalid.';

    const userFound = await this.userRepository.checkEmail(email);
    if (!userFound) {
      throw new ApiError(errorMessage, 401);
    }
    const passwordCompare = await compare(password, userFound.password);
    if (!passwordCompare) {
      throw new ApiError(errorMessage, 401);
    }

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign(
      {},
      secret,
      {
        subject: userFound.id,
        expiresIn,
      },
    );

    return {
      user: userFound,
      token,
    };
  }
}


export default AuthenticateUserService;
