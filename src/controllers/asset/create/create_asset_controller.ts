import { Request, Response } from "express";
// import { CreatePortfolioRequestDTO } from "../../portfolio/create/create_portfolio_dto";
import { CreateAssetRequestDTO } from "./create_asset_dto";
import { AssetRepository } from "../../../repository/asset_repository";
import { CreateAssetUseCase } from "./create_asset_use_case";

export default class CreateAssetController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const assetData: CreateAssetRequestDTO = req.body;

            if (!assetData) {
                return res.status(400).json({ error: 'Invalid Data' });
            }

            const assetRepository: AssetRepository = new AssetRepository();
            const createAssetUseCase: CreateAssetUseCase = new CreateAssetUseCase(assetRepository);
            const result = await createAssetUseCase.execute(assetData);

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