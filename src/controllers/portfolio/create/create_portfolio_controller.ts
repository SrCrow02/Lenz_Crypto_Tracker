import { Request, Response } from "express";
import { PortfolioRepository } from "../../../repository/portfolio_repository";
import { CreatePortfolioRequestDTO } from "./create_portfolio_dto";
import CreatePortfolioUseCase from "./create_portfolio_use_case";

export class CreatePortfolioController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const portfolioData: CreatePortfolioRequestDTO = req.body;

            if(!portfolioData) {
                return res.status(400).json({ error: 'Invalid Data' });
            }

            const portfolioRepository: PortfolioRepository = new PortfolioRepository();
            const createPortfolioUseCase = new CreatePortfolioUseCase(portfolioRepository);
            const result = await createPortfolioUseCase.execute(portfolioData);

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