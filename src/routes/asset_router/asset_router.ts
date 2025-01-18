import _express, { Router } from 'express';
import CreateAssetController from '../../controllers/asset/create/create_asset_controller';

const asset_router = Router();

asset_router.post('/create', CreateAssetController.create);

export { asset_router }