import UserModel from '@modules/user/infra/typeorm/entities/user.entity';
import IUserDto from '@modules/user/dto/iuser.dto';

export default interface IUserRepository {
  checkEmail(email: string): Promise<UserModel | undefined>;
  checkName(name: string): Promise<UserModel | undefined>;
  findUserById(id: string): Promise<UserModel | undefined>;
  create(data: IUserDto): Promise<UserModel>;
  find(): Promise<UserModel[]>;
  remove(userModel: UserModel): Promise<UserModel>;
  save(userModel: UserModel): Promise<UserModel>;
  // eslint-disable-next-line semi
}
