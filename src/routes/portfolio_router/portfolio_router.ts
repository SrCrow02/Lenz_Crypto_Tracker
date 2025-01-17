import _express, { Router } from 'express';
import { CreatePortfolioController } from '../../controllers/portfolio/create/create_portfolio_controller';

const portfolio_router = Router();

portfolio_router.post('/create', CreatePortfolioController.create);

export { portfolio_router };