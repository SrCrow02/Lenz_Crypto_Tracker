import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compresstion from 'compression';
// import multer from 'multer';
// import { API_KEY, API_SECRET } from '../config.json';
// import axios from 'axios';
import { Logger } from './middlewares/logger';
import { coin_info_router } from './routes/coin_infos_router/coin_infos_router';
import { user_auth_router } from './routes/user_router/auth/user_auth_router';
import { portfolio_router } from './routes/portfolio_router/portfolio_router';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(Logger.log);

app.use(bodyParser.json());

app.use(helmet());

app.use('/coins', coin_info_router);
app.use('/auth', user_auth_router);
app.use('/portfolio', portfolio_router);

app.use(compresstion());

const server = http.createServer(app);

export { server, app };
