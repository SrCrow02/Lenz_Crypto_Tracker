import { Request, Response } from 'express';
import { RegisterRequestDTO } from './register_dto';
import { UserRepository } from '../../../repository/user_repository';
import { RegisterUseCase } from './register_use_case';

export class RegisterController {
  static async register(req: Request, res: Response): Promise<Response> {
    const data: RegisterRequestDTO = req.body;

    try {
      const userRepository = new UserRepository();
      const registerUserUseCase = new RegisterUseCase(userRepository);

      const result = await registerUserUseCase.execute(data);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        success: false,
        error: 'An error occurred while requesting',
      });
    }
  }
}