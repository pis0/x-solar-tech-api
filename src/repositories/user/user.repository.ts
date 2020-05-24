
import { EntityRepository, Repository } from 'typeorm';
import UserModel from '../../models/user/user.model';

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
