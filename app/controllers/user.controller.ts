import { Request, Response } from 'express';
import logger from '../config/logger';
import User from '../models/User.Model';
import { hashPassword  , tokenGenerator} from '../middlewares/auth-hash';
import { formatError } from '../utils/error.util';
const NAMESPACE = 'User Controller';

export const passwordLogin = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body;
        const data:any = await User.findOne({ 'email': email});
        
        var hash = hashPassword(password, data.salt);
        let collection :any = {}

        if (data?.password == hash ) {
            collection.login = true
            collection.user_email = data.email
            collection.user_id = data._id
            collection.user_name = data.name

            let tokens = { email }

            const newToken = tokenGenerator(tokens)
            collection.access_token = newToken

            const filter = { _id: data._id };
            const update = {access_token: newToken }

            await User.findOneAndUpdate(filter, update, {
                new: true
            });
            
        }else{
            collection.login = false
        }
        return res.json(collection);

    } catch (err: any) {
        logger.error(NAMESPACE, 'Create Product error', err);
        res.status(500).json(formatError(err));
    }
};

