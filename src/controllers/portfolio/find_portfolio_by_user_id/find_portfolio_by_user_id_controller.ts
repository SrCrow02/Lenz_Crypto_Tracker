import { Request, Response } from "express";
import { PortfolioRepository } from "../../../repository/portfolio_repository";
// import { FindPortfolioRequestDTO } from "./find_portfolio_dto";
import { FindPortfolioByUserIdUseCase } from "../find_portfolio_by_user_id/find_portfolio_by_user_id_use_case";

export class FindPortfolioByUserIdController {
    static async find_by_user_id(req: Request, res: Response): Promise<Response> {
        try {
            const userid = parseInt(req.query.userid as string, 10);

            if(isNaN(userid)) {
                return res.status(400).json({ error: 'Invalid Data: userId must be a number' });
            }

            const portfolioRepository: PortfolioRepository = new PortfolioRepository();
            const findPortfolioByUserIdUseCase: FindPortfolioByUserIdUseCase = new FindPortfolioByUserIdUseCase(portfolioRepository);
            const result = await findPortfolioByUserIdUseCase.execute({ userid });
            
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