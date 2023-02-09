import express from 'express';
import apiController from '../controller/apiController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', apiController.getAllUsers);

    router.post('/create-user', apiController.createUser)

    router.put('/update-user', apiController.updateUser)

    router.delete('/delete-user/:id', apiController.deleteUser)

    return app.use('/api/v1/', router)
}

export default initAPIRoute;