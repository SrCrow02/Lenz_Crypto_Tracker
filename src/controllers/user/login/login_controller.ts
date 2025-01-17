import { Request, Response } from 'express';
import { LoginRequestDTO } from './login_dto';
import { UserRepository } from '../../../repository/user_repository';
import { LoginUseCase } from './login_use_case';

export class LoginController {
  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const userData: LoginRequestDTO = req.body;

      if (!userData) {
        return res.status(400).json({ error: 'Invalid Data!' });
      }

      const userRepository: UserRepository = new UserRepository();
      const loginUserUseCase = new LoginUseCase(userRepository);
      const result = await loginUserUseCase.execute(userData);

      if (result && result.success) {
        return res.status(200).json({ message: result });
      } else {
        return res.status(400).json({ error: result.error });
      }
    } catch (error) {
      console.error('Error:', error);

      res.status(500).json({
        success: false,
        error: 'An error occurred while requesting',
      });

      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
