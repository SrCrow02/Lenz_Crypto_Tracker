import { Request, Response } from "express";
import { PortfolioRepository } from "../../../repository/portfolio_repository";
// import { FindPortfolioRequestDTO } from "./find_portfolio_dto";
import { FindPortfolioUseCase } from "./find_portfolio_use_case";

export class FindPortfolioController {
    static async find_by_id(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.query.id as string, 10);

            if(isNaN(id)) {
                return res.status(400).json({ error: 'Invalid Data: id must be a number' });
            }

            const portfolioRepository: PortfolioRepository = new PortfolioRepository();
            const findPortfolioUseCase: FindPortfolioUseCase = new FindPortfolioUseCase(portfolioRepository);
            const result = await findPortfolioUseCase.execute({ id });
            
            if (result && result.success) {
                return res.status(200).json({ message: result });
            } else {
                return res.status(400).json({ error: result.error });
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