import { UsersService } from "../services/UsersService";


export class UserController {

    async create (req: Request, res: Response) {        
        const { name } : string = req.body;

        await UsersService.create(name);
    }
}