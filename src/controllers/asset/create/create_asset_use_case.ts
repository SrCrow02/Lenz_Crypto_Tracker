import Joi from "@hapi/joi";
import { AssetRepository } from "../../../repository/asset_repository";
import { CreateAssetRequestDTO } from "./create_asset_dto";

export class CreateAssetUseCase {
    constructor(private assetRepository: AssetRepository) {}

    async execute(data: CreateAssetRequestDTO) {
        const assetSchema = Joi.object({
            name: Joi.string().required().min(1).max(200),
            quantity: Joi.number().required().min(1),
            symbol: Joi.string().required().min(1).max(30),
            purchasePrice: Joi.number().required().min(1),
            purchaseDate: Joi.date().required(),
            portfolioId: Joi.number().required()
        })

        const { error } = assetSchema.validate(data);
        if (error) {
            console.error('ValidationError', Error);
            return {
                success: false,
                error: 'Invalid Data',
                details: error.details,
            };
        }

        const data_create = {
            name: data.name,
            quantity: data.quantity,
            symbol: data.symbol,
            purchasePrice: data.purchasePrice,
            purchaseDate: new Date(data.purchaseDate).toISOString(), 
            portfolio: {
                connect: { id: data.portfolioId },
            },
        };
        

        await this.assetRepository.create(data_create);

        return {
            success: true,
            message: 'Asset created successfully',
        }
    }
}