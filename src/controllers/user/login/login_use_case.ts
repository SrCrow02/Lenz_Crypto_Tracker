import { UserRepository } from '../../../repository/user_repository';
import { LoginRequestDTO } from './login_dto';
import hash from 'bcrypt';
import Joi from '@hapi/joi';
import { JWT_SECRET } from '../../../../config.json';
import jwt from 'jsonwebtoken';

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: LoginRequestDTO) {
    const userSchema = Joi.object({
      email: Joi.string().required().min(1).max(200).email(),
      password: Joi.string().required().min(8).max(500),
    });

    const { error } = userSchema.validate(data);
    if (error) {
      console.error('ValidationError:', error);
      return {
        success: false,
        error: 'Invalid Data',
        details: error.details,
      };
  }

    const user = await this.userRepository.findUserByEmail(data.email);

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const comparedPassword = await hash.compare(data.password, user.password);

    if (!comparedPassword) {
      return { success: false, error: 'Invalid User' };
    }

    const payload = {
      userId: user.id,
      role: 'Client',
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30s' });

    return {
      success: true,
      message: 'User logged successfully',
      token: token
    };
  }
}