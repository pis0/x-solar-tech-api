
import { EntityRepository, Repository } from 'typeorm';
import UserModel from '@modules/user/infra/typeorm/entities/user.entity';

@EntityRepository(UserModel)
class UserRepository extends Repository<UserModel> {
  public async checkEmail(email: string): Promise<UserModel | null> {
    const findUser = await this.findOne({
      where: { email },
    });
    return findUser || null;
  }

  public async checkName(name: string): Promise<UserModel | null> {
    const findUser = await this.findOne({
      where: { name },
    });
    return findUser || null;
  }

  public async findUserById(id: string): Promise<UserModel | null> {
    const findUser = await this.findOne({
      where: { id },
    });
    return findUser || null;
  }
}

export default UserRepository;
