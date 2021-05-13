import { Router } from "express";

import { SettingController } from "./controllers/SettingController";
import { UserController } from "./controllers/UserController";

const routes =  Router();

const settingController = new SettingController();
const userController = new UserController();


//Settings
routes.get("/settings", settingController.list);
routes.post('/settings', settingController.create);
routes.put('/settings/:id', settingController.update)

//Users
routes.get('/users', userController.list);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.create);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);


export { routes };