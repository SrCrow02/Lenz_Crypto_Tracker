import Joi from "@hapi/joi";
import { BlackListRepository } from "../../../repository/blacklist_repository";
import { LogoutUserRequestDTO } from "./logout_dto";

export class LogoutUserUseCase {
    constructor(private blackListRepository: BlackListRepository) {}

    async execute(data: LogoutUserRequestDTO) {
        const userSchema = Joi.object({
            token: Joi.string().required().min(1).max(200).required()
          });
      
          const { error } = userSchema.validate(data);
          if (error) {
            console.error('ValidationError:', error);
            return {
              success: false,
              error: 'Dados inválidos',
              details: error.details,
            };
        }

        await this.blackListRepository.create(data.token);

        return {
          success: true,
          message: 'User logout successfully',
        };
    }
}