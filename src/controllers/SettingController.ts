import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingRepository } from '../repositories/SettingRepository';

class SettingController {
    
    async create(req: Request , res: Response) {
        const { id, username, chat } = req.body;

        const settingRepository = getCustomRepository(SettingRepository);

        // const surveyAlreadyExists = await surveyRepository.findOne({id})

        // if(surveyAlreadyExists) {
        //     return res.status(400).json({error: 'Survey already exists!'})
        // }
        
        const setting = settingRepository.create({username, chat});

        await settingRepository.save(setting);
        
        return res.status(201).json(setting);
    };

    async update(req: Request, res: Response) {

        const { id } = req.params;
    
        const settingRepository = getCustomRepository(SettingRepository);

        const setting = await settingRepository.findOne({id});

        if (setting) {
            const { username, chat } = req.body;
            const settingUpdated = await settingRepository.merge(setting, req.body);

            settingRepository.save(settingUpdated);

            return res.status(200).json(settingUpdated);
        };

        return res.status(404).json({error: 'Setting not found'});
    };

    // async delete(req: Request, res: Response) {
    //     const { id } = req.params;
    
    //     const surveyRepository = getCustomRepository(SurveyRepository);

    //     const survey = await surveyRepository.findOne(id);

    //     if (survey) {
    //         await surveyRepository.remove(survey);

    //         return res.status(200).json({message: 'Survey deleted successfully!'});
    //     };

    //     return res.status(404).json({error: 'Survey not found'});
    // };

    async list(req: Request, res: Response) {
        const settingRepository = getCustomRepository(SettingRepository);

        const settings = await settingRepository.find();

           return res.status(200).json(settings);
    };

    // async show(req: Request, res: Response) {
    //     const { id } = req.params;
    
    //     const surveyRepository = getCustomRepository(SurveyRepository);

    //     const survey = await surveyRepository.findOne(id);

    //     if(survey) {
    //         return res.status(200).json(survey);
    //     }

    //     return res.status(404).json({error: 'Survey not found'});
    // };

};

export { SettingController };