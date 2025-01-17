import { UserRepository } from '../../../repository/user_repository';
import { RegisterRequestDTO } from './register_dto';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: RegisterRequestDTO) {
    const userSchema = Joi.object({
      name: Joi.string().required().min(1).max(200).required(),
      email: Joi.string().min(1).max(200).email().required(),
      password: Joi.string().required().min(8).max(500).required(),
      address: Joi.string().required().min(1).max(200).required()
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

    const existingUser = await this.userRepository.findUserByEmail(data.email);
    if (existingUser) {
      return {
        success: false,
        error: 'User already exist',
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10); 

    const userData = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    await this.userRepository.create(userData);

    return {
      success: true,
      message: 'User registered successfully',
    };
  }
}