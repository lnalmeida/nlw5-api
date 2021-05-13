import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
    
    async create(req: Request , res: Response) {
        const { id, email, username } = req.body;

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({email})

        if(userAlreadyExists) {
            return res.status(400).json({error: 'User already exists!'})
        }
        
        const user = userRepository.create({email, username});

        await userRepository.save(user);
        
        return res.status(201).json(user);
    };

    async update(req: Request, res: Response) {

        const { id } = req.params;
    
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({id});

        if (user) {
            const { username, chat } = req.body;
            const userUpdated = await userRepository.merge(user, req.body);

            userRepository.save(userUpdated);

            return res.status(200).json(userUpdated);
        };

        return res.status(404).json({error: 'User not found'});
    };

    async delete(req: Request, res: Response) {
        const { id } = req.params;
    
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne(id);

        if (user) {
            await userRepository.remove(user);

            return res.status(200).json({message: 'User deleted successfully!'});
        };

        return res.status(404).json({error: 'User not found'});
    };

    async list(req: Request, res: Response) {
        const userRepository = getCustomRepository(UserRepository);

        const users = await userRepository.find();

           return res.status(200).json(users);
    };

    async show(req: Request, res: Response) {
        const { id } = req.params;
    
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne(id);

        if(user) {
            return res.status(200).json(user);
        }

        return res.status(404).json({error: 'User not found'});
    };

};

export { UserController };