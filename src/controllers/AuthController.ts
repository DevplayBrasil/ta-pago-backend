import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";


export class AuthController {

    static async login (req: Request, res: Response) {
        
        const { email, password, rememberMe } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "É obrigatório informar o email e a senha." });
        }

        const authService = await AuthService.login(email, password, rememberMe);
        const statusCode = authService.status || 400;
        delete authService.status;
        if (!authService.token) delete authService.token;

        return res.status(statusCode).send(authService);
    }

    static async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "É obrigatório informar o nome, o email e a senha." });
        }

        const authService = await AuthService.register(name, email, password);
        const statusCode = authService.status || 400;

        return res.status(statusCode).send(authService);
    }

}