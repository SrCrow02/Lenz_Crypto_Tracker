import Joi from "@hapi/joi";
import { PortfolioRepository } from "../../../repository/portfolio_repository";
import { FindPortfolioByUserIdRequestDTO } from "./find_portfolio_by_user_id_dto";

export class FindPortfolioByUserIdUseCase {
    constructor(private portfolioRepository: PortfolioRepository) {} 

    async execute(data: FindPortfolioByUserIdRequestDTO) {
        const portfolioSchema = Joi.object({
            userid: Joi.number().required().min(1).max(200).required()
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

      const portfolio = await this.portfolioRepository.findPortfolio(data.userid);

      return {
        success: true,
        message: 'Portfolio found successfully', 
        content: `${portfolio?.name}, ${portfolio?.userId}, ${portfolio?.id}, ${portfolio?.createdAt}, ${portfolio?.updatedAt}`
      };
    }
}