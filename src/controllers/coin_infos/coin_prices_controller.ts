import axios from "axios";
import CoinPrice from "../../interfaces/coin_infos_interfaces/coin_infos_interfaces";

export class CoinPrices {
    private baseUrl: string = 'https://api.coinbase.com/v2';

    public async getCoinPrices(ids: string[]): Promise<CoinPrice> {
        try {
            const coinPrices: CoinPrice = {};

            for (const id of ids) {
                const response = await axios.get(`${this.baseUrl}/prices/${id}-USD/spot`);

                const price = parseFloat(response.data.data.amount);
                coinPrices[id] = price;
            }
            return coinPrices;
        } catch(error) {
            console.error('Erro ao obter preços das moedas:', error);
            throw new Error('Erro ao buscar preços das criptomoedas');
        }
    }
}

