import Joi from "@hapi/joi";
import { PortfolioRepository } from "../../../repository/portfolio_repository";
import { FindPortfolioRequestDTO } from "./find_portfolio_dto";

export class FindPortfolioUseCase {
    constructor(private portfolioRepository: PortfolioRepository) {}

    async execute(data: FindPortfolioRequestDTO) {
        const portfolioSchema = Joi.object({
            id: Joi.number().required().min(1).max(200).required()
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

      const portfolio = await this.portfolioRepository.findPortfolio(data.id);

      return {
        success: true,
        message: 'Portfolio found successfully', 
        content: `${portfolio?.name}, ID: ${portfolio?.userId}, ${portfolio?.id}, ${portfolio?.createdAt}, ${portfolio?.updatedAt}`
      };
    }
}