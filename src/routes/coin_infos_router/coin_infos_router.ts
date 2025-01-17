import _express, { Request, Response, Router } from 'express';
import { CoinPrices } from '../../controllers/coin_infos/coin_prices_controller';

const coin_info_router = Router();

coin_info_router.get('/prices', async (req: Request, res: Response): Promise<Response> => {
  const coinIds = req.query.ids ? (req.query.ids as string).split(',') : [];

  if (coinIds.length === 0) {
    return res.status(400).json({ error: 'IDs das criptos são necessários' });
  }

  try {
    const coinPrices = await new CoinPrices().getCoinPrices(coinIds);
    return res.json({ coinPrices }); // Retorna a resposta com os preços
  } catch (error) {
    console.error('Erro ao obter os preços:', error);
    return res.status(500).json({ error: 'Erro ao obter os preços das criptomoedas' }); 
  }
});

export { coin_info_router };