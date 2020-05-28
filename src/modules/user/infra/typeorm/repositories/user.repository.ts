
import { getRepository, Repository } from 'typeorm';
import UserModel from '@modules/user/infra/typeorm/entities/user.entity';
import IUserRepository from '@modules/user/repositories/iuser.repository';
import IUserDto from '@modules/user/dto/iuser.dto';

class UserRepository
implements IUserRepository {
  private repository: Repository<UserModel>;

  constructor() {
    this.repository = getRepository(UserModel);
  }

  private async findOne(value: string): Promise<UserModel | undefined> {
    return this.repository.findOne({
      where: { value },
    });
  }

  public async checkEmail(email: string): Promise<UserModel | undefined> {
    return this.findOne(email);
  }

  public async checkName(name: string): Promise<UserModel | undefined> {
    return this.findOne(name);
  }

  public async findUserById(id: string): Promise<UserModel | undefined> {
    return this.findOne(id);
  }

  public async create({
    name, email, password,
  }: IUserDto): Promise<UserModel> {
    const user = this.repository.create({
      name, email, password,
    });

    // await this.repository.save(user);
    // return user;

    return this.repository.save(user);
  }

  public async find(): Promise<UserModel[]> {
    return this.repository.find();
  }

  public async remove(addressModel: UserModel): Promise<UserModel> {
    return this.repository.remove(addressModel);
  }

  public async save(addressModel: UserModel): Promise<UserModel> {
    return this.repository.save(addressModel);
  }
}

export default UserRepository;
