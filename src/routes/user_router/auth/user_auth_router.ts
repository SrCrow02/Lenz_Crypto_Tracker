import _express, { Router } from 'express';
import { RegisterController } from '../../../controllers/user/register/register_controller';
import { LoginController } from '../../../controllers/user/login/login_controller';
import { LogoutUserController } from '../../../controllers/user/logout/logout_controller';

const user_auth_router = Router();

user_auth_router.post('/register', RegisterController.register);
user_auth_router.post('/login', LoginController.login);
user_auth_router.post('/logout', LogoutUserController.logout);

export { user_auth_router };
