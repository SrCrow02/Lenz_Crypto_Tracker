import Joi from "@hapi/joi";
import { PortfolioRepository } from "../../../repository/portfolio_repository";
import {CreatePortfolioRequestDTO} from "./create_portfolio_dto";

export default class CreatePortfolioUseCase {
    constructor(private portfolioRepository: PortfolioRepository) {}

    async execute(data: CreatePortfolioRequestDTO) {
        const portfolioSchema = Joi.object({
            name: Joi.string().required().min(1).max(200),
            userId: Joi.number().required().min(1).max(200)
        });

        const { error } = portfolioSchema.validate(data);
        if (error) {
          console.error('ValidationError:', error);
          return {
            success: false,
            error: 'Invalid Data',
            details: error.details,
          };
      }

      const data_create = {
        name: data.name,
        user: {
          connect: {
            id: data.userId, 
          },
        },
      };

      await this.portfolioRepository.create(data_create)

      return {
        success: true,
        message: 'Portfolio created successfully',
      };
    }
}