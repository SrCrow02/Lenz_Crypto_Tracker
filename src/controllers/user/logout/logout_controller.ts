import { Request, Response } from "express";
import { LogoutUserRequestDTO } from "./logout_dto";
import { BlackListRepository } from "../../../repository/blacklist_repository";
import { LogoutUserUseCase } from "./logout_use_case";

export class LogoutUserController {
    static async logout(req: Request, res: Response): Promise<Response> {
        const token: LogoutUserRequestDTO = req.body;

        try {
            const blackListRepository = new BlackListRepository();
            const logoutUserUseCase = new LogoutUserUseCase(blackListRepository);

            const result = await logoutUserUseCase.execute(token);
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