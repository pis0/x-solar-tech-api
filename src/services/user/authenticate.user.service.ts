import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserRepository from '../../repositories/user/user.repository';
import UserModel from '../../models/user/user.model';
import AuthConfig from '../../config/auth.config';


interface UserDto {
  email: string;
  password: string;
}

interface ResponseDto {
  user: UserModel;
  token: string;
}

class AuthenticateUserService {
  public async run({
    email, password,
  }: UserDto): Promise<ResponseDto> {
    const userRepository = getCustomRepository(UserRepository);

    const errorMessage = 'email or password invalid.';

    const userFound = await userRepository.checkEmail(email);
    if (!userFound) {
      throw new Error(errorMessage);
    }
    const passwordCompare = await compare(password, userFound.password);
    if (!passwordCompare) {
      throw new Error(errorMessage);
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
