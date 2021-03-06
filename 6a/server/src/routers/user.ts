import { Router, Request, Response } from 'express';
import { createUser } from '../controllers/user';


// a submodule for express to respond to specific subdivided client requests
export const userRouter: Router = Router();

//type AsyncRequestHandler<RequestType extends Request> = (req: Request, res: Response) => Promise<any>;

interface CreateUserRequest extends Request {
    body: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
};

const createUserHandler = async (req: CreateUserRequest, res: Response) => {
    const{firstName, lastName, email, password} = req.body;
    const user = await createUser(firstName, lastName, email, password);
    if (user) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false,
            message: 'User already exists'
        });
    }
}; 

userRouter.post('/create', createUserHandler);