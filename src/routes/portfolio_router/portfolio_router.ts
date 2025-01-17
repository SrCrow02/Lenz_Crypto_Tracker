import _express, { Router } from 'express';
import { CreatePortfolioController } from '../../controllers/portfolio/create/create_portfolio_controller';
import { FindPortfolioController } from '../../controllers/portfolio/find_portfolio/find_portfolio_controller';
import { FindPortfolioByUserIdController } from '../../controllers/portfolio/find_portfolio_by_user_id/find_portfolio_by_user_id_controller';


const portfolio_router = Router();

portfolio_router.post('/create', CreatePortfolioController.create);
portfolio_router.get('/getbyid', FindPortfolioController.find_by_id);
portfolio_router.get('/getbyuserid', FindPortfolioByUserIdController.find_by_user_id);

export { portfolio_router };