export interface CreateAssetRequestDTO {
    name: string;
    quantity: number;
    symbol: string; // Ex: BTC, ETH
    purchasePrice: number;
    purchaseDate: Date;
    portfolioId: number;
}